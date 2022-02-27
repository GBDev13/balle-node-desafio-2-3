import { PrismaUsersRepository } from "@modules/users/repositories/prisma/PrismaUsersRepository";
import { DeleteUserByIdController } from "@modules/users/usecases/deleteUserById/DeleteUserByIdController";
import { DeleteUserByIdUseCase } from "@modules/users/usecases/deleteUserById/DeleteUserByIdUseCase";

export function makeDeleteUserByIdController() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUserByIdUseCase = new DeleteUserByIdUseCase(prismaUsersRepository);

  const getUserByIdController = new DeleteUserByIdController(
    getUserByIdUseCase
  );

  return getUserByIdController;
}
