import { Controller } from "@core/infra/Controller";
import {
  clientError,
  conflict,
  fail,
  HttpResponse,
  ok,
} from "@core/infra/HttpResponse";
import { UserDoesNotExists } from "@modules/users/errors/UserDoesNotExists";
import { DeleteUserByIdUseCase } from "./DeleteUserByIdUseCase";

type DeleteUserByIdRequest = {
  id: string;
};

class DeleteUserByIdController implements Controller {
  constructor(private deleteUserByIdUseCase: DeleteUserByIdUseCase) {}

  async handle({ id }: DeleteUserByIdRequest): Promise<HttpResponse> {
    try {
      const result = await this.deleteUserByIdUseCase.execute(id);

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

export { DeleteUserByIdController };
