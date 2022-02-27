import { Controller } from "@core/infra/Controller";
import {
  clientError,
  conflict,
  fail,
  HttpResponse,
  ok,
} from "@core/infra/HttpResponse";
import { UserDoesNotExists } from "@modules/users/errors/UserDoesNotExists";
import { GetAuthenticatedUserUseCase } from "./GetAuthenticatedUserUseCase";

type GetUserByIdRequest = {
  userId: string;
};

class GetAuthenticatedUserController implements Controller {
  constructor(
    private getAuthenticatedUserUseCase: GetAuthenticatedUserUseCase
  ) {}

  async handle({ userId }: GetUserByIdRequest): Promise<HttpResponse> {
    try {
      const result = await this.getAuthenticatedUserUseCase.execute(userId);

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

export { GetAuthenticatedUserController };
