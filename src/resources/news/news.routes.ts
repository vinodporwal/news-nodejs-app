import * as express from "express";

import { validator } from "@middlewares";

import {
  saveNews,
  getNews,
  deleteNews,
  updateNews,
  filterAndSearchNews,
} from "./controller";

const routes = express.Router();

import saveNewsSchema from "./schemas/saveNews.schema";
import updateNewsSchema from "./schemas/updateNews.schema";

routes.post("/news", validator(saveNewsSchema), saveNews);
routes.get("/news", getNews);
routes.get("/news/:filter/:query", filterAndSearchNews);
routes.delete("/news/:id", validator(saveNewsSchema), deleteNews);
routes.put("/news", validator(updateNewsSchema), updateNews);

export default routes;
