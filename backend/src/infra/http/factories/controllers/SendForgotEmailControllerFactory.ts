import { PrismaUsersRepository } from "@modules/users/repositories/prisma/PrismaUsersRepository";
import { PrismaUsersTokensRepository } from "@modules/users/repositories/prisma/PrismaUsersTokensRepository";
import { SendForgotEmailUseCase } from "@modules/users/usecases/sendForgotEmail/SendForgotEmailUseCase";
import { SendForgotEmailController } from "@modules/users/usecases/sendForgotEmail/SendForgotEmailController";

export function makeSendForgotEmailController() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaUsersTokensRepository = new PrismaUsersTokensRepository();

  const sendForgotEmailUseCase = new SendForgotEmailUseCase(
    prismaUsersRepository,
    prismaUsersTokensRepository
  );

  const sendForgotEmailController = new SendForgotEmailController(
    sendForgotEmailUseCase
  );

  return sendForgotEmailController;
}
