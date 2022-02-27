import { Controller } from "@core/infra/Controller";
import {
  clientError,
  conflict,
  fail,
  HttpResponse,
  ok,
} from "@core/infra/HttpResponse";
import { AccountAlreadyExistsError } from "../../errors/AccountAlreadyExistsError";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

type UpdateUserControllerRequest = {
  id: string;
  name: string;
  email: string;
  password: string;
};

class UpdateUserController implements Controller {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle({
    id,
    name,
    email,
    password,
  }: UpdateUserControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.updateUserUseCase.execute({
        id,
        name,
        email,
        password,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case AccountAlreadyExistsError:
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

export { UpdateUserController };
