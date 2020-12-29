/**
 * Validating data comming from the client
 *
 */
exports.validateLinkData = (req, res, next) => {
  try {
    const { title, owner } = req.body;

    if (!title || title.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'error',
        errors: [
          {
            details: 'Title of the link is missing. Title should provided.',
          },
        ],
      });
    }

    if (!owner || owner.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'error',
        errors: [
          {
            details: 'User id should be provided.',
          },
        ],
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
