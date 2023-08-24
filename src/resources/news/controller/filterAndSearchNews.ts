import * as express from "express";

import NewsService from "resources/news/services/NewsService";

export default async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { filter, query } = req.params;
    const newsService = new NewsService();

    const result = await newsService.getFilterAndSearchNews({ filter, query });

    return res.apiResponse(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
