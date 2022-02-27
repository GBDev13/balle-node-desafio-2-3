import { ICreateUserDTO } from "./ICreateUserDTO";

export interface IUpdateUserDTO extends ICreateUserDTO {
  id: string;
}
