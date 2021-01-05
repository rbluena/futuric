const { decode } = require('jsonwebtoken');
const request = require('axios');
const { omit } = require('lodash');
const {
  createLinkService,
  updateLinkService,
  deleteLinkService,
  getLinkByIdService,
  getAllLinksService,
  getWaitingLinksService,
  addWaitingService,
  removeWaitingService,
} = require('../services/link');

/**
 * Request handler for creating new todo.
 */
exports.newLinkHandler = async (req, res, next) => {
  try {
    // Saving data based on
    let doc = await createLinkService(req.body);

    const response = await request({
      url: `${process.env.BITLY_API_URL}/shorten`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.BITLY_ACCESS_TOKEN}`,
      },
      data: JSON.stringify({
        long_url: `${process.env.SITE_URL}/links/${doc._id}`,
        domain: 'bit.ly',
      }),
    });

    const bitlyData = response.data;
    doc.shortenUrl = bitlyData.link;
    doc.longUrl = bitlyData.long_url;

    doc = await doc.save();

    return res.status(201).json({
      status: 201,
      success: true,
      message: 'Link was created successfully.',
      data: doc,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Request handler for updating a todo.
 */
exports.updateLinkHandler = async (req, res, next) => {
  try {
    const linkId = req.params.id;
    const doc = await updateLinkService(linkId, req.body);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Link was updated successfully.',
      data: { ...doc },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for updating a todo.
 */
exports.deleteLinkHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const doc = await deleteLinkService(id);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Link was deleted successfully.',
      data: { ...doc },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for getting link
 */
exports.getLinkHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await getLinkByIdService(id);
    const doc = document.toObject();
    doc.isUserOwner = false;
    doc.owner.isUserFollowingAuthor = false;

    if (req.app.jwt) {
      const user = decode(req.app.jwt);

      // Is the link owned by current authenticated user?
      if (String(user._id) === String(doc.owner._id)) {
        doc.isUserOwner = true;
      }

      // Is current user a follower of link's author
      if (doc.owner.followers.includes(user._id)) {
        doc.owner.isUserFollowingAuthor = true;
      }

      delete doc.owner.followers;
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Here is the link.',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for getting all links.
 */
exports.getLinksHandler = async (req, res, next) => {
  try {
    const user = decode(req.app.jwt);

    let data = [];

    if (user) {
      data = await getAllLinksService(req.query, user._id);
    } else {
      data = await getAllLinksService(req.query, null);
    }
    const meta = omit(data, 'docs');
    const { docs } = data;

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Here the list of todos.',
      data: { meta, data: docs },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Request handler for getting user's waitings.
 */
exports.getWaitingsHandler = async (req, res, next) => {
  try {
    const user = decode(req.app.jwt);

    if (!user) {
      return res.status(403).json({
        status: 403,
        success: false,
        message: 'Unauthorized',
        errors: {
          details: 'You are not logged in. Please login',
        },
      });
    }

    const data = await getWaitingLinksService(user._id, req.query);

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Your items in waiting list.',
      data: data.waitings,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Adding link to the waiting list
 */
exports.addWaitingHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = decode(req.app.jwt);

    const data = await addWaitingService(user._id, id);

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Item added to the waiting list successfully.',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Removing item from the waiting list
 */
exports.removeWaitingHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = decode(req.app.jwt);

    const data = await removeWaitingService(user._id, id);

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Item removed to the waiting list successfully.',
      data,
    });
  } catch (error) {
    return next(error);
  }
};
