import express from "express";

import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";

import { makeAuthenticateUserController } from "../factories/controllers/AuthenticateUserControllerFactory";
import { adaptMiddleware } from "@core/infra/adapters/ExpressMiddlewareAdapter";
import { makeEnsureAuthenticatedMiddleware } from "../factories/middlewares/EnsureAuthenticatedMiddlewareFactory";
import { makeGetAuthenticatedUserController } from "../factories/controllers/GetAuthenticatedUserControllerFactory";

const sessionsRoutes = express.Router();

sessionsRoutes.post("/", adaptRoute(makeAuthenticateUserController()));

sessionsRoutes.get(
  "/me",
  adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
  adaptRoute(makeGetAuthenticatedUserController())
);

export { sessionsRoutes };
