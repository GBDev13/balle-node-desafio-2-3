import { Either, left, right } from "@core/logic/Either";
import { UserDoesNotExists } from "@modules/users/errors/UserDoesNotExists";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokenRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import crypto from "crypto";
import dayjs from "dayjs";
import sendgridTransport from "nodemailer-sendgrid-transport";
import nodemailer from "nodemailer";
import { resolve } from "path";
import fs from "fs";
import handlebars from "handlebars";

const msgEmail = process.env.MAILADRESS;

type CreateUserUseCaseResponse = Either<UserDoesNotExists, null>;

export class SendForgotEmailUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(email: string): Promise<CreateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new UserDoesNotExists());
    }

    const expires_date = dayjs().add(3, "hour").toDate();

    const token = crypto.randomUUID();
    await this.usersTokensRepository.create({
      token,
      userId: user.id,
      expires_date,
    });

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
      "forgotPassword.hbs"
    );
    const templateFileContent = fs.readFileSync(htmlPath).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse({
      name: user.name.value,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    });

    const message = {
      from: msgEmail,
      to: email,
      subject: "Password Reset - Jade Dragon",
      html: templateHTML,
    };

    transporter.sendMail(message);

    return right(null);
  }
}
