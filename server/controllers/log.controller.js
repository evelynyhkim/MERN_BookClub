const Log = require('../models/log.model')
const User = require('../models/user.model')
const jwt = require("jsonwebtoken")

module.exports = {
    getAll: (req, res) => {
        Log.find()
        .then(logs => {
            console.log('getAll logs')
            res.json(logs)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    createOne: (req, res) => {
        console.log('------ req: ' + req)
        const newLog = new Log(req.body)
        //newLog.userId = jwt.decode(req.cookie.usertoken, {complete: true}).payload.id
        newLog.reviewDate = new Date()
        
        newLog.save()
        .then(log => {
            console.log('createOne - new log')
            res.json(log)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    getOne: (req, res) => {
        Log.findById(req.params.id)
        .then(log => {
            console.log('getOne')
            res.json(log)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    updateOne: (req, res) => {
        console.log('updateOne')
        Log.findById(req.params.id)
        .then(log => {
            if(log.aname == req.body.aname) {// user is not requesting to update name
                Log.updateOne({_id: req.params.id}, req.body, {new: true, runValidators: true})
                .then(log => {
                    res.json(log)
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json(err)
                })
            }
            else {// user requesting to update name; need to check if name is unique
                Log.exists({aname: req.body.aname}, function(err, result){
                    if(err) res.status(400).json(err)
                    else if(result) res.status(409).json({"errors":{"aname": {"message":"Sorry, the name is already taken. Choose a different name."}}})
                    else {
                        Log.updateOne({_id: req.params.id}, req.body, {new: true, runValidators: true})
                        .then(log => {
                            res.json(log)
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
        Log.findByIdAndDelete(req.params.id)
        .then(log => {
            console.log('deleteOne')
            res.json(log)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    // increaseLikes: (id) => {
    //     Log.findByIdAndUpdate(id, {$inc: { likes: 1 }}, {new: true})
    //     .then(log => {
    //         console.log(log)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.status(400).json(err)
    //     }) 
    // }
}