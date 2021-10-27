const express = require("express");
const User = require("./users-model");
const Post = require("./../posts/posts-model");

// The middleware functions also need to be required
const {
  handleError,
  validateUserId,
  validateUser,
  validatePost,
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

router.get("/:id/posts", validateUserId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await User.getUserPosts(id);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/:id/posts",
  validateUserId,
  validatePost,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const newPost = await Post.insert({ text, user_id: id });
      res.status(201).json(newPost);
    } catch (err) {
      next(err);
    }
  }
);

router.use(handleError);

module.exports = router;
