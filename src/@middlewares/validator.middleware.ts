// eslint-disable-next-line max-params
export default schema => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    return res.apiBadRequest(err);
  }
};
