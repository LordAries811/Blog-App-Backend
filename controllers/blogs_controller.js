const BlogModel = require("../models/Blogs");
const User = require("../models/Users");
const express = require("express");
const mongoose = require("mongoose");

const getAllBlogs = async (req, res) => {
    let blogs;
    try {
        blogs = await BlogModel.find();
    } catch (e) {
        return console.log(e);
    }

    if (!blogs) {
        return res.status(404).json({ message: "No blogs to show" });
    }
    return res.status(200).json({ blogs });
};

const addBlog = async (req, res) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (e) {
        return console.log(e);
    }
    
    if(!existingUser){
        return res.status(400).json({ message: "Sorry, You are not an existing user" });
    }

    const blog = new BlogModel({ title, description, image, user });
    try {
        //await blog.save();
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (e) {
        return console.log(e);
    }
    return res.status(200).json({ blog });
};
const updateBlog = async (req, res) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await BlogModel.findByIdAndUpdate(blogId, { title, description });
    } catch (e) {
        return console.log(e);
    }

    if (!blog) {
        return res.status(500).json({ message: "Unable to update the blog" });
    }
    return res.status(200).json({ blog });
};

const getById = async (req, res) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await BlogModel.findById(id);
    } catch (e) {
        return console.log(e);
    }
    return res.status(200).json({ blog });
};

const deleteById = async (req, res) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await BlogModel.findByIdAndDelete(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (e) {
        return console.log(e);
    }

    if (!blog) {
        return res.status(404).json({ message: "Unable to delete the blog" });
    }
    return res.status(200).json({ message: "Blog has been deleted successfully" });
};
module.exports = { getAllBlogs, getById, addBlog, updateBlog, deleteById };
