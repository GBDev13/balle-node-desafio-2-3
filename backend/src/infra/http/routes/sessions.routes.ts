import express from "express";

import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";

import { makeAuthenticateUserController } from "../factories/controllers/AuthenticateUserControllerFactory";

const sessionsRoutes = express.Router();

sessionsRoutes.post("/", adaptRoute(makeAuthenticateUserController()));

export { sessionsRoutes };
