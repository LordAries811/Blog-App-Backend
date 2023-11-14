const express = require("express");
const blogRouter = express.Router();
const {getAllBlogs,addBlog,getById,updateBlog,deleteById} = require("../controllers/blogs_controller");

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.get("/:id",getById);
blogRouter.put("/update/:id",updateBlog);
blogRouter.delete("/:id",deleteById);

module.exports = blogRouter;