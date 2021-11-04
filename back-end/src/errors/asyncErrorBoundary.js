function asyncErrorBoundary(delegate, defaultStatus) {
  return async (req, res, next) => {
    try {
      await Promise.resolve();
      return await delegate(req, res, next);
    } catch ({ status = defaultStatus, message = error }) {
      next({
        status,
        message
      });
    }
  }
  // return (request, response, next) => {
  //   Promise.resolve()
  //     .then(() => delegate(request, response, next))
  //     .catch((error = {}) => {
  //       const { status = defaultStatus, message = error } = error;
  //       next({
  //         status,
  //         message
  //       });
  //     })
  // }
}

module.exports = asyncErrorBoundary;