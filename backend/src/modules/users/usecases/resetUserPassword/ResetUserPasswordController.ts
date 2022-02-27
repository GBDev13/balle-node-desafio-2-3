import { Controller } from "@core/infra/Controller";
import {
  clientError,
  conflict,
  fail,
  HttpResponse,
  ok,
} from "@core/infra/HttpResponse";
import { UserDoesNotExists } from "@modules/users/errors/UserDoesNotExists";
import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

type SendForgotEmailRequest = {
  token: string;
  password: string;
};

class ResetUserPasswordController implements Controller {
  constructor(private resetUserPasswordUseCase: ResetUserPasswordUseCase) {}

  async handle({
    token,
    password,
  }: SendForgotEmailRequest): Promise<HttpResponse> {
    try {
      const result = await this.resetUserPasswordUseCase.execute({
        token,
        password,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case UserDoesNotExists:
            return conflict(error);
          default:
            return clientError(error);
        }
      } else {
        return ok();
      }
    } catch (err: any) {
      return fail(err);
    }
  }
}

export { ResetUserPasswordController };
