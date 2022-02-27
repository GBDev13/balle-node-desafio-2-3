import { Either, left, right } from "@core/logic/Either";
import { UserDoesNotExists } from "@modules/users/errors/UserDoesNotExists";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { User } from "@prisma/client";

type GetUserByIdResponse = Either<UserDoesNotExists, User>;

export class GetUserByIdUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(userId: string): Promise<GetUserByIdResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new UserDoesNotExists());
    }

    return right(user);
  }
}
