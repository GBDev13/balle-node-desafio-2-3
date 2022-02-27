import { UserTokens } from "@prisma/client";
import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  findByToken(token: string): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
