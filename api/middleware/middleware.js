const User = require("./../users/users-model");

function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`
    METHOD: ${req.method}
    URL:    ${req.originalUrl}
    TIME:   ${time}
  `);
  next();
}

function handleError(err, req, res) {
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
  logger,
  handleError,
  validateUserId,
  validateUser,
  validatePost,
};
