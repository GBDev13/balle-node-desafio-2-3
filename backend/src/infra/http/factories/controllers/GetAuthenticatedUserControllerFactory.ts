import { PrismaUsersRepository } from "@modules/users/repositories/prisma/PrismaUsersRepository";
import { GetAuthenticatedUserController } from "@modules/users/usecases/getAuthenticatedUser/GetAuthenticatedUserController";
import { GetAuthenticatedUserUseCase } from "@modules/users/usecases/getAuthenticatedUser/GetAuthenticatedUserUseCase";

export function makeGetAuthenticatedUserController() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getAuthenticatedUserUseCase = new GetAuthenticatedUserUseCase(
    prismaUsersRepository
  );

  const getAuthenticatedUserController = new GetAuthenticatedUserController(
    getAuthenticatedUserUseCase
  );

  return getAuthenticatedUserController;
}
