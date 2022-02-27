import { PrismaUsersRepository } from "@modules/users/repositories/prisma/PrismaUsersRepository";
import { GetUserByIdUseCase } from "@modules/users/usecases/getUserById/GetUserByIdUseCase";
import { GetUserByIdController } from "@modules/users/usecases/getUserById/GetUserByIdController";

export function makeGetUserByIdController() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(prismaUsersRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  return getUserByIdController;
}
