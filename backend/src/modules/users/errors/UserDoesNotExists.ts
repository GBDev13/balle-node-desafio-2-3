import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class UserDoesNotExists extends Error implements UseCaseError {
  constructor() {
    super(`This user does not exists`);
    this.name = "UserDoesNotExists";
  }
}
