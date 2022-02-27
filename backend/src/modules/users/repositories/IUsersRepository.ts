import { User } from "@modules/users/domain/user";
import { User as UserPrisma } from "@prisma/client";

export interface IUsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<UserPrisma | null>;
  deleteById(id: string): Promise<void>;
  findAll(): Promise<UserPrisma[]>;
  updateById(userId: string, user: User): Promise<void>;
  updatePassById(userId: string, pass: string): Promise<void>;
}
