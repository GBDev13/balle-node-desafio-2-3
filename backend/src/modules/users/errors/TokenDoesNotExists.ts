import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class TokenDoesNotExists extends Error implements UseCaseError {
  constructor() {
    super(`This token does not exists`);
    this.name = "TokenDoesNotExists";
  }
}
