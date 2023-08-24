// eslint-disable-next-line max-params, no-unused-vars
export default (err, _req, res, next) => {
  const errInfo = 'Something went wrong';
  res.apiInternalError(err, errInfo);
};
