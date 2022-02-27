import { prisma } from "@infra/prisma/client";
import { ICreateUserTokenDTO } from "@modules/users/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@prisma/client";
import { IUsersTokensRepository } from "../IUsersTokenRepository";

export class PrismaUsersTokensRepository implements IUsersTokensRepository {
  async create({
    expires_date,
    token,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const created = await prisma.userTokens.create({
      data: {
        expires_date,
        token,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return created;
  }

  async findByToken(token: string): Promise<UserTokens> {
    const result = await prisma.userTokens.findFirst({
      where: {
        token,
      },
    });

    return result;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.userTokens.delete({
      where: { id },
    });
  }
}
