import { Either, left, right } from "@core/logic/Either";
import { UserDoesNotExists } from "@modules/users/errors/UserDoesNotExists";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokenRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import dayjs from "dayjs";
import sendgridTransport from "nodemailer-sendgrid-transport";
import nodemailer from "nodemailer";
import { resolve } from "path";
import fs from "fs";
import handlebars from "handlebars";
import { TokenDoesNotExists } from "@modules/users/errors/TokenDoesNotExists";
import { TokenExpired } from "@modules/users/errors/TokenExpired";
import { Password } from "@modules/users/domain/password";

const msgEmail = process.env.MAILADRESS;

type ResetUserPasswordUseCaseResponse = Either<UserDoesNotExists, null>;

type ResetUserPasswordRequest = {
  token: string;
  password: string;
};

export class ResetUserPasswordUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({
    token,
    password,
  }: ResetUserPasswordRequest): Promise<ResetUserPasswordUseCaseResponse> {
    const tokenExists = await this.usersTokensRepository.findByToken(token);

    if (!tokenExists) {
      return left(new TokenDoesNotExists());
    }

    if (dayjs(tokenExists.expires_date).isBefore(dayjs().toDate())) {
      return left(new TokenExpired());
    }

    const user = await this.usersRepository.findById(tokenExists.userId);

    if (!user) {
      return left(new UserDoesNotExists());
    }

    const passwordOrError = Password.create(password);

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const passHashed = await passwordOrError?.value.getHashedValue();

    await this.usersRepository.updatePassById(tokenExists.userId, passHashed);

    await this.usersTokensRepository.deleteById(tokenExists.id);

    const transporter = nodemailer.createTransport(
      sendgridTransport({
        auth: {
          api_key: process.env.SENDGRID_API_KEY,
        },
      })
    );

    const htmlPath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "passwordChanged.hbs"
    );
    const templateFileContent = fs.readFileSync(htmlPath).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse({
      name: user.name,
    });

    const message = {
      from: msgEmail,
      to: user.email,
      subject: "Password Changed - Jade Dragon",
      html: templateHTML,
    };

    transporter.sendMail(message);

    return right(null);
  }
}
