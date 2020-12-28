const jwt = require('jsonwebtoken');
const {
  createWorkspaceService,
  updateWorkspaceService,
  deleteWorkspaceService,
  // getWorkspacesService,
  getWorkspacesByUserService,
} = require('../services/workspace');

/**
 * Request handler for creating new workspace
 *
 */
exports.newWorkspaceHandler = async (req, res, next) => {
  try {
    const user = jwt.decode(req.app.jwt);
    const doc = await createWorkspaceService(user.id, req.body);

    res.status(201).json({
      status: 201,
      success: true,
      message: 'New workspace was created successfully.',
      data: { ...doc },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for updating existing workspace
 *
 */
exports.updateWorkspaceHandler = async (req, res, next) => {
  try {
    const doc = await updateWorkspaceService(req.params.id, req.body);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Workspace was updated successfully.',
      data: { ...doc },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for deleting existing workspace
 *
 */
exports.deleteWorkspaceHandler = async (req, res, next) => {
  try {
    const doc = await deleteWorkspaceService(req.params.id);

    res.status(200).json({
      status: 200,
      success: true,
      message:
        'Workspace was scheduled to be completely removed from our database in the next 24hrs.',
      data: { _id: doc._id },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for querying existing workspaces
 *
 */
exports.getWorkspacesHandler = async (req, res, next) => {
  try {
    const user = jwt.decode(req.app.jwt);
    const options = req.query;
    const userId = options.userId ? options.userId : user.id;

    const workspaces = await getWorkspacesByUserService(userId, options);

    res.status(200).json({
      status: 200,
      success: true,
      message: !workspaces
        ? "Currently you don't have any workspace. Create workspace to start adding todos."
        : 'Here the list of workspaces.',
      data: workspaces,
    });
  } catch (error) {
    next(error);
  }
};
