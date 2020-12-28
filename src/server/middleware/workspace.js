/**
 * Validating data comming from the client
 *
 */
exports.validateWorkspaceData = (req, res, next) => {
  try {
    const { name, color } = req.body;

    if (!name || name.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'error',
        errors: [
          {
            details: 'Name of the workspace is required',
          },
        ],
      });
    }

    if (!color || color.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'error',
        errors: [
          {
            details: 'Color code of the workspace is required',
          },
        ],
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
