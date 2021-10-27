const Post = require("./../posts/posts-model");
const User = require("./../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
}

function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  });
}

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const targetUser = await User.getById(id);
    if (targetUser) {
      next();
    } else {
      next({ status: 404, message: `user with id ${id} not found!` });
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  try {
    const { name } = req.body;
    if (name) {
      next();
    } else {
      next({ status: 400, message: "missing required name field" });
    }
  } catch (err) {
    next(err);
  }
}

function validatePost(req, res, next) {
  try {
    const { text } = req.body;
    if (text) {
      next();
    } else {
      next({ status: 400, message: "missing required text field" });
    }
  } catch (err) {
    next(err);
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  handleError,
  validateUserId,
  validateUser,
  validatePost,
};
