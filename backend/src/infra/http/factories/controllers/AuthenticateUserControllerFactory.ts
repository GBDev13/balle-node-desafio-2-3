import { Controller } from "@core/infra/Controller";
import { PrismaUsersRepository } from "@modules/users/repositories/prisma/PrismaUsersRepository";
import { AuthenticateUserController } from "@modules/users/usecases/authenticateUser/AuthenticateUserController";
import { AuthenticateUserUseCase } from "@modules/users/usecases/authenticateUser/AuthenticateUserUseCase";

export function makeAuthenticateUserController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateUserUseCase = new AuthenticateUserUseCase(
    prismaUsersRepository
  );
  const authenticateUserController = new AuthenticateUserController(
    authenticateUserUseCase
  );

  return authenticateUserController;
}
