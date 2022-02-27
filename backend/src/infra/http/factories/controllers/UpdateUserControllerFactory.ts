import { PrismaUsersRepository } from "@modules/users/repositories/prisma/PrismaUsersRepository";
import { UpdateUserController } from "@modules/users/usecases/updateuser/UpdateUserController";
import { UpdateUserUseCase } from "@modules/users/usecases/updateuser/UpdateUserUseCase";

export function makeUpdateUserController() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository);

  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
}
