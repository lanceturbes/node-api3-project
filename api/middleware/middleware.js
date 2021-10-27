const Post = require("./../posts/posts-model");
const User = require("./../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
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
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  validateUserId,
};
