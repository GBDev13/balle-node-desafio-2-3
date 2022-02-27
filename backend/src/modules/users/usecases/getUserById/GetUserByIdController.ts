import { Controller } from "@core/infra/Controller";
import {
  clientError,
  conflict,
  fail,
  HttpResponse,
  ok,
} from "@core/infra/HttpResponse";
import { UserDoesNotExists } from "@modules/users/errors/UserDoesNotExists";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";

type GetUserByIdRequest = {
  id: string;
};

class GetUserByIdController implements Controller {
  constructor(private getUserByIdUseCase: GetUserByIdUseCase) {}

  async handle({ id }: GetUserByIdRequest): Promise<HttpResponse> {
    try {
      const result = await this.getUserByIdUseCase.execute(id);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case UserDoesNotExists:
            return conflict(error);
          default:
            return clientError(error);
        }
      } else {
        return ok({ data: result.value });
      }
    } catch (err: any) {
      return fail(err);
    }
  }
}

export { GetUserByIdController };
