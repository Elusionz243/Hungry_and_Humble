const asyncErrorBoundary = (delegate, defaultStatus) => {
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
}

module.exports = asyncErrorBoundary;