import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class TokenExpired extends Error implements UseCaseError {
  constructor() {
    super(`This token is expired`);
    this.name = "TokenExpired";
  }
}
