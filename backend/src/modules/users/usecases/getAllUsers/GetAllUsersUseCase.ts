import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { User } from "@prisma/client";

type GetAllUsersResponse = User[];

export class GetAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<GetAllUsersResponse> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}
