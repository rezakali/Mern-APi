const Blog = require("../models/blogModel");
const mongoose = require("mongoose");

/**Get All */
const getAllBlog = async (req, res) => {
  const blog = await Blog.find({}).sort({ createdAt: -1 });Blog
  res.status(200).json(blog);
};

/**Get Single */
const getBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Blogs" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(404).json({ error: "No Blog found by this", id });
  }
  res.status(200).json(blog);
};

/**POST DATa */
const createBlog = async (req, res) => {
  const { name, title, body } = req.body;

  const emptyFields = []

  if(!title){
    emptyFields.push("Title")
  }
  if(!name){
    emptyFields.push("Name")
  }
  if(!body){
    emptyFields.push("Body")
  }
  
  if(emptyFields.length > 0){
    return res.status(400).json({error: "Please fill in all the fields", emptyFields})
  }

  try {
    const blog = await Blog.create({ name, title, body });
    res.status(200).json({ blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
/**Delete Data */
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog" });
  }
  const blog = await Blog.findByIdAndDelete({ _id: id });
  if (!blog) {
    res.status(404).json({ error: "No blog found by this", id });
  }
  res.status(200).json(blog);
};

/**Update Data */
const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Workouts" });
  }
  const blog = await Blog.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!blog) {
    res.status(404).json({ error: "No blog found by this", id });
  }
  res.status(200).json(blog);
};

module.exports = {
  createBlog,
  getAllBlog,
  getBlog,
  deleteBlog,
  updateBlog,
};
