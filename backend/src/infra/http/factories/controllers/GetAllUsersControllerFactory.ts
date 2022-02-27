import { PrismaUsersRepository } from "@modules/users/repositories/prisma/PrismaUsersRepository";
import { GetAllUsersController } from "@modules/users/usecases/getAllUsers/GetAllUsersController";
import { GetAllUsersUseCase } from "@modules/users/usecases/getAllUsers/GetAllUsersUseCase";

export function makeGetAllUsersController() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getAllUsersUseCase = new GetAllUsersUseCase(prismaUsersRepository);

  const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);

  return getAllUsersController;
}
