import { Controller } from "@core/infra/Controller";
import { fail, HttpResponse, ok } from "@core/infra/HttpResponse";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";

class GetAllUsersController implements Controller {
  constructor(private getAllUsersUseCase: GetAllUsersUseCase) {}

  async handle(): Promise<HttpResponse> {
    try {
      const result = await this.getAllUsersUseCase.execute();

      return ok({ data: result });
    } catch (err: any) {
      return fail(err);
    }
  }
}

export { GetAllUsersController };
