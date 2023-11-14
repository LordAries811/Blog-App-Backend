const express = require("express");
const User = require("../models/Users");
const bcrypt = require('bcrypt');

const getAllUser = async(req,res) => {
    let users;
    try{
        users = await User.find();
    } catch(e){
        return console.log(e);
    }

    if(!users){
        return res.status(404).json({message: "No users found"});
    }
    return res.status(200).json({users});
};

const signup = async(req,res) => {
    const {name, email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
        //console.log(existingUser);
    } catch(e){
        return console.log(e);
    }

    if(existingUser){
        return res.status(400).json({message: "User already exists!! Login instead"});
    }
    // create new user if it is non existing user
    // we use hashing and salting to hash(secure) the passwords
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedpwd = bcrypt.hashSync(password,salt);
    const user = new User({name, email, password: hashedpwd});
    try{
        await user.save();// mongoose library provides save() to db
    } catch(e){
        return console.log(e);
    }
    return res.status(201).json({user});
}

const login = async(req,res) => {
    const {email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
        //console.log(existingUser);
    } catch(e){
        return console.log(e);
    }

    if(!existingUser){
        return res.status(404).json({message: "User NOT FOUND!"});
    }

    const isCorrectPwd = bcrypt.compareSync(password,existingUser.password);
    if(!isCorrectPwd){
        return res.status(404).json({message: "Incorrect Password!"});
    }
    return res.status(200).json({message: "Login Successful"});
};
module.exports = {getAllUser,signup,login};

