import bodyParser = require("body-parser");
import compression from "compression";
import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
const mongoose = require("mongoose");

import { apiResponses as response } from "@constants";
import { callableApi, errorHandler } from "@middlewares";
import routes from "@routes/v1";

import getCorsOptions from "@server/getCorsoptions";

const createServer = ({
  routeBase = "/api/v1",
  timeoutSeconds = 60,
  useJwt = false,
  useAppCheck = false,
  extraRoutes = [],
}: {
  routeBase: string;
  timeoutSeconds: number;
  useJwt: boolean;
  extraRoutes: Array<any>;
  useAppCheck: boolean;
}) => {
  const app = express();
  const isDevMode = process.env.NODE_ENV === "development";
  const MONGO_DB_URL = process.env.MONGO_DB_DATABASE_URL ?? "";

  app.use(helmet());
  app.use(json({ limit: "5mb" }));
  // eslint-disable-next-line max-params
  app.get("/favicon.ico", (_req, res) => res.status(204));
  app.use(bodyParser.json({ limit: "5mb" }));
  app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
  app.options("*", cors(getCorsOptions));
  app.use(cors(getCorsOptions));

  app.all("*", callableApi);

  console.log(MONGO_DB_URL);

  mongoose
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
    })
    .then((result) => console.log("connected"));

  // eslint-disable-next-line max-params
  app.use((_req, res, next) => {
    res.setTimeout(
      1000 * timeoutSeconds,
      /* istanbul ignore next */ () =>
        res.apiError(response.TIME_OUT, "Timeout occurred")
    );
    next();
  });

  app.use(routeBase, ...routes);

  if (extraRoutes.length > 0) {
    app.use(routeBase, ...extraRoutes);
  }

  // eslint-disable-next-line max-params
  app.all("*", (_req, res) => {
    res.apiNotFound(new Error("Not Found!"));
  });

  app.set("json spaces", 0);
  app.use(errorHandler);

  return app;
};

export default createServer;
