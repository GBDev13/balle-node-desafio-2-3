import { PrismaUsersRepository } from "@modules/users/repositories/prisma/PrismaUsersRepository";
import { PrismaUsersTokensRepository } from "@modules/users/repositories/prisma/PrismaUsersTokensRepository";
import { ResetUserPasswordUseCase } from "@modules/users/usecases/resetUserPassword/ResetUserPasswordUseCase";
import { ResetUserPasswordController } from "@modules/users/usecases/resetUserPassword/ResetUserPasswordController";

export function makeResetUserPasswordController() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaUsersTokensRepository = new PrismaUsersTokensRepository();

  const resetUserPasswordUseCase = new ResetUserPasswordUseCase(
    prismaUsersRepository,
    prismaUsersTokensRepository
  );

  const resetUserPasswordController = new ResetUserPasswordController(
    resetUserPasswordUseCase
  );

  return resetUserPasswordController;
}
