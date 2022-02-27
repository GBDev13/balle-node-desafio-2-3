import { Request, Response, NextFunction } from "express";

import { Middleware } from "@core/infra/Middleware";

export const adaptMiddleware = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const requestData = {
      accessToken: request.headers?.["authorization"]?.split(" ")[1],
      userId: request.userId,
      ...(request.headers || {}),
    };

    const httpResponse = await middleware.handle(requestData, request.body);

    if (httpResponse === false) {
      return response.status(200).send();
    }

    if (httpResponse.statusCode === 200) {
      Object.assign(request, httpResponse.body);

      return next();
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.error,
      });
    }
  };
};
