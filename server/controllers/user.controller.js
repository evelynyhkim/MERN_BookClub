const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    getAll: (req, res) => {
        User.find()
        .then(users => {
            console.log('getAll')
            res.json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    signUp: (req, res) => {
        //res with cookies
        /* res.cookie("Cookie token name", "encrypted cookie string value", { httpOnly: true }).json({
            message: "This response has a cookie"
        }); 
        */
        //ensuring name is unique
        User.exists({email: req.body.email}, function(err, result){
            if(err) res.status(400).json(err)
            else {
                if(result) {
                    console.log('User exists')
                    res.status(409).json({"errors":{"email": {"message":"Sorry, a user with the email already exists"}}})
                }
                else {
                    User.create(req.body)
                    .then(user => {
                        console.log('createOne')
                        res.json(user)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).json(err)
                    })
                }
            }
        })
    },
    signIn: (req, res) => {
        User.findOne({email: req.body.email})
        .then(user => {
            if(user === null){
                console.log("email not found")
                res.status(400).json({message: "Sorry, email is not found"})
            } else {
                bcrypt
                .compare(req.body.password, user.password)
                .then(isValidPw => {
                    if(isValidPw){
                        console.log("valid password")
                        res.cookie(
                            "usertoken",
                            jwt.sign({
                                    id: user._id,
                                    email: user.email
                                }, process.env.JWT_SECRET
                            ),
                            {httpOnly:true, expires: new Date(Date.now() + 6000000)} //100 minutes
                        ).json({
                            message: "Signin success",
                            id: user._id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName
                        })
                    } else {
                        res.status(400).json({message: "Sorry, email and/or password is invalid"})
                    }
                })
                .catch(err=>{
                    console.log(err)
                    res.status(400).json(err)
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    signOut: (req, res) => {
        res.clearCookie('usertoken')
        res.sendStatus(200)
    },
    updateOne: (req, res) => {
        console.log('updateOne')
        User.findById(req.params.id)
        .then(user => {
            if(user.email == req.body.email) {// user is not requesting to update name
                User.updateOne({_id: req.params.id}, req.body, {new: true, runValidators: true})
                .then(user => {
                    res.json(user)
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json(err)
                })
            }
            else {// user requesting to update name; need to check if name is unique
                User.exists({email: req.body.email}, function(err, result){
                    if(err) res.status(400).json(err)
                    else if(result) res.status(409).json({"errors":{"email": {"message":"Sorry, the email is already taken. Choose a different name."}}})
                    else {
                        User.updateOne({_id: req.params.id}, req.body, {new: true, runValidators: true})
                        .then(user => {
                            res.json(user)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).json(err)
                        })
                    }
                })
            }
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    },    
    deleteOne: (req, res) => {
        User.findByIdAndDelete(req.params.id)
        .then(user => {
            console.log('deleteOne')
            res.json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    addToLibrary: (req, res) => {
        User.findByIdAndUpdate(req.params.id, {$push: {library: req.params.logId}}, {new:true})
        .then(user => {
            console.log('add to Library')
            res.json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    }
    // increaseLikes: (id) => {
    //     User.findByIdAndUpdate(id, {$inc: { plikes: 1 }}, {new: true})
    //     .then(user => {
    //         console.log(user)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.status(400).json(err)
    //     }) 
    // }
}