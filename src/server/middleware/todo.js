/**
 * Validating data comming from the client
 *
 */
exports.validateTodoData = (req, res, next) => {
  try {
    const { workspace, date } = req.body;

    // if (!text || text.length === 0) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: 'error',
    //     errors: [
    //       {
    //         details: 'Text for the todo is required.',
    //       },
    //     ],
    //   });
    // }

    if (!workspace || workspace.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'error',
        errors: [
          {
            details: 'Missing reference to the workspace.',
          },
        ],
      });
    }

    if (!date) {
      return res.status(400).json({
        status: 400,
        message: 'error',
        errors: [
          {
            details: 'Date of the todo should be provided.',
          },
        ],
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
