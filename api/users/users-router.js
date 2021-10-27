const express = require("express");
const User = require("./users-model");
const Post = require("./../posts/posts-model");

// The middleware functions also need to be required
const {
  handleError,
  validateUserId,
  validateUser,
} = require("./../middleware/middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateUserId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.getById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateUser, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newUser = await User.insert({ name });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateUserId, validateUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const editedUser = await User.update(id, { name });
    res.status(200).json(editedUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.getById(id);
    await User.remove(id);
    res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use(handleError);

module.exports = router;
