import { Either, left, right } from "@core/logic/Either";
import { InvalidEmailError } from "@modules/users/domain/errors/InvalidEmailError";
import { InvalidNameError } from "@modules/users/domain/errors/InvalidNameError";
import { InvalidPasswordLengthError } from "@modules/users/domain/errors/InvalidPasswordLengthError";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { Email } from "../../domain/email";
import { Name } from "../../domain/name";
import { Password } from "../../domain/password";
import { User } from "../../domain/user";
import { AccountAlreadyExistsError } from "../../errors/AccountAlreadyExistsError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

type UpdateUserUseCaseResponse = Either<
  | AccountAlreadyExistsError
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordLengthError,
  User
>;

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    id,
    name,
    email,
    password,
  }: IUpdateUserDTO): Promise<UpdateUserUseCaseResponse> {
    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);

    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const userOrError = User.create({
      name: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;

    const userAlreadyExists = await this.usersRepository.findByEmail(
      user.email.value
    );

    if (userAlreadyExists && userAlreadyExists.id !== id) {
      return left(new AccountAlreadyExistsError(user.email.value));
    }

    await this.usersRepository.updateById(id, user);

    return right(user);
  }
}
