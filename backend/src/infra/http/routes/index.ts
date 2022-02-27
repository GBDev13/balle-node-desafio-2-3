import { Router } from "express";
import { sessionsRoutes } from "./sessions.routes";

import { userRoutes } from "./user.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sessionsRoutes);

export { router };
