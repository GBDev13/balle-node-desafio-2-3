import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";
import { Router } from "express";

import { adaptMiddleware } from "@core/infra/adapters/ExpressMiddlewareAdapter";
import { makeEnsureAuthenticatedMiddleware } from "../factories/middlewares/EnsureAuthenticatedMiddlewareFactory";
import { makeCreateUserController } from "../factories/controllers/CreateUserControllerFactory";
import { makeGetAllUsersController } from "../factories/controllers/GetAllUsersControllerFactory";
import { makeGetUserByIdController } from "../factories/controllers/GetUserByIdControllerFactory";
import { makeUpdateUserController } from "../factories/controllers/UpdateUserControllerFactory";
import { makeDeleteUserByIdController } from "../factories/controllers/DeleteUserByIdControllerFactory";

const userRoutes = Router();

userRoutes.get("/", adaptRoute(makeGetAllUsersController()));
userRoutes.get(
  "/:id",
  adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
  adaptRoute(makeGetUserByIdController())
);

userRoutes.post("/", adaptRoute(makeCreateUserController()));
userRoutes.put("/:id", adaptRoute(makeUpdateUserController()));
userRoutes.delete("/:id", adaptRoute(makeDeleteUserByIdController()));

userRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()));

export { userRoutes };
