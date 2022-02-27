import { Either, left, right } from "@core/logic/Either";
import { UserDoesNotExists } from "@modules/users/errors/UserDoesNotExists";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

type DeleteUserByIdResponse = Either<UserDoesNotExists, null>;

export class DeleteUserByIdUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(userId: string): Promise<DeleteUserByIdResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new UserDoesNotExists());
    }

    await this.usersRepository.deleteById(user.id);

    return right(null);
  }
}
