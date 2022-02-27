import { Controller } from "@core/infra/Controller";
import {
  clientError,
  conflict,
  created,
  fail,
  HttpResponse,
} from "@core/infra/HttpResponse";
import { AccountAlreadyExistsError } from "../../errors/AccountAlreadyExistsError";
import { CreateUserUseCase } from "./CreateUserUseCase";

type CreateUserControllerRequest = {
  name: string;
  email: string;
  password: string;
};

class CreateUserController implements Controller {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle({
    name,
    email,
    password,
  }: CreateUserControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.createUserUseCase.execute({
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
        return created();
      }
    } catch (err: any) {
      return fail(err);
    }
  }
}

export { CreateUserController };
