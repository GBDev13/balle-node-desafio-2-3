import { User as UserPrisma } from "@prisma/client";
import { User } from "@modules/users/domain/user";
import { UserMapper } from "@modules/users/mappers/UserMapper";
import { prisma } from "infra/prisma/client";
import { IUsersRepository } from "../IUsersRepository";

export class PrismaUsersRepository implements IUsersRepository {
  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    await prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async findById(id: string): Promise<UserPrisma | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findAll(): Promise<UserPrisma[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async updateById(userId: string, user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    const { id, ...rest } = data;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: { ...rest },
    });
  }

  async deleteById(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async updatePassById(userId: string, pass: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: pass,
      },
    });
  }
}
