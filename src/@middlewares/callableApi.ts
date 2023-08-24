/* eslint-disable max-params */
import { apiResponses as response } from "@constants";
import { logToConsole } from "@helper";

const callableApi = (_req, res, next) => {
  res.apiResponse = (data) => {
    res.json(data);
  };

  res.apiError = (status, err, info) => {
    res.status(status || response.INTERNAL_ERROR);
    res.apiResponse({
      success: false,
      message: info,
    });
  };

  // Handler for HTTP response codes : errors
  res.apiNotFound = (err, info) => {
    res.apiError(response.PAGE_NOT_FOUND, err, info || "Data not found");
  };

  /* istanbul ignore next */
  res.apiBadRequest = (err, info) => {
    logToConsole("apiBadRequest", err, info);
    res.apiError(response.BAD_REQUEST, err, info || "Bad request");
  };

  res.apiUnauthorized = (err, info) => {
    res.apiError(response.UNAUTHORIZED, err, info || "Unauthorized operation");
  };

  res.apiForbidden = (err, info) => {
    res.apiError(response.FORBIDDEN, err, info || "Request forbidden");
  };

  res.apiNotAllowedMethod = (err, info) => {
    res.apiError(response.NOT_ALLOWED, err, info || "Method not allowed");
  };

  res.apiInternalError = (err, info) => {
    res.apiError(undefined, err, info || "Internal error");
  };

  next();
};

export default callableApi;
