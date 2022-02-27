import { PrismaUsersRepository } from "@modules/users/repositories/prisma/PrismaUsersRepository";
import { CreateUserController } from "@modules/users/usecases/createUser/CreateUserController";
import { CreateUserUseCase } from "@modules/users/usecases/createUser/CreateUserUseCase";

export function makeCreateUserController() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
}
