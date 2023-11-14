const BlogModel = require("../models/Blogs");
const express = require("express");

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
    const blog = new BlogModel({ title, description, image, user });
    try {
        await blog.save();
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
        blog = await BlogModel.findByIdAndDelete(id);
    } catch (e) {
        return console.log(e);
    }

    if (!blog) {
        return res.status(404).json({ message: "Unable to delete the blog" });
    }
    return res.status(200).json({ message: "Blog has been deleted successfully" });
};
module.exports = { getAllBlogs, getById, addBlog, updateBlog, deleteById };
