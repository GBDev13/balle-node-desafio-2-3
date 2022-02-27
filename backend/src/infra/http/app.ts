import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());

app.use(
  cors({
    exposedHeaders: ["x-total-count", "Content-Type", "Content-Length"],
  })
);

app.use(router);

export { app };
