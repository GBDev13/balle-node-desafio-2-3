import { Controller } from "@core/infra/Controller";
import { HttpResponse, ok, fail, clientError } from "@core/infra/HttpResponse";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

type AuthenticateUserControllerRequest = {
  email: string;
  password: string;
};

export class AuthenticateUserController implements Controller {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle({
    email,
    password,
  }: AuthenticateUserControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      if (result.isLeft()) {
        const error = result.value;

        return clientError(error);
      } else {
        const { token } = result.value;

        return ok({ token });
      }
    } catch (err) {
      return fail(err);
    }
  }
}
