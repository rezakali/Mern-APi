const express = require("express");
const Workout = require("../models/blogModel");
const router = express.Router();
const { createBlog, getAllBlog, getBlog, deleteBlog, updateBlog } = require("../controllers/blogControllers");

/** GET ALL DATA */
router.get("/", getAllBlog);

/** GET Single DATA */
router.get("/:id", getBlog);

/** Post DATA */
router.post("/", createBlog);

/** Delete  DATA */
router.delete("/:id", deleteBlog);

/** Update  DATA */
router.patch("/:id", updateBlog);

module.exports = router;
