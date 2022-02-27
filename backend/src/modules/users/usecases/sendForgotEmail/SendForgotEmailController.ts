import { Controller } from "@core/infra/Controller";
import {
  clientError,
  conflict,
  fail,
  HttpResponse,
  ok,
} from "@core/infra/HttpResponse";
import { UserDoesNotExists } from "@modules/users/errors/UserDoesNotExists";
import { SendForgotEmailUseCase } from "./SendForgotEmailUseCase";

type SendForgotEmailRequest = {
  email: string;
};

class SendForgotEmailController implements Controller {
  constructor(private sendForgotEmailUseCase: SendForgotEmailUseCase) {}

  async handle({ email }: SendForgotEmailRequest): Promise<HttpResponse> {
    try {
      const result = await this.sendForgotEmailUseCase.execute(email);

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

export { SendForgotEmailController };
