const express = require("express");
const router = express.Router();

const userRoutes = require("./userController");
router.use("/api/users", userRoutes);

const blogRoutes = require("./blogsController");
router.use("/api/blogs", blogRoutes);

const frontEndRoutes = require("./frontEndController");
router.use("/", frontEndRoutes);

module.exports = router;
