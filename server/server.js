const express = require('express')
const cors = require('cors')
const app = express()
const httpServer = require('http').createServer(app)
const socket = require('socket.io')
const Log = require('./models/log.model')
require('dotenv').config()
//e.g. const mySecret = process.env.JWT_SECRET;
//in .env MY_SECRET_KEY = "my key"
const jwt = require('jsonwebtoken')
/*
const payload = {
    id: user._id
}
const userToken = jwt.sign(payload, process.env.SECRET_KEY)
*/
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json(), express.urlencoded({extended:true}))
app.use(cors({
    //below line added for cookieParser
    credentials: true,
    origin: "http://localhost:3000"
}))

require("./config/mongoose.config")
require('./routes/log.route')(app)
require('./routes/user.route')(app)

const portNum = 8000
app.listen(portNum, ()=>console.log(`Express app listening on port ${portNum}`))

const socketPortNum = 5000
httpServer.listen(socketPortNum, ()=>console.log(`httpServer listening on port ${socketPortNum}`))

const io=socket(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    }
})

io.on("connection", socket=>{
    console.log('new socket id: ' + socket.id)
    socket.on("DeleteRequest", arg=>{
        console.log("Delete requested: " + arg)
        Log.findByIdAndDelete(arg)
        .then(log => {
            console.log('deleteOne')
            io.emit("DeleteLog", {_id: arg})
        })
        .catch(err => {
            console.log(err)
        })
    })
    
    socket.on("Liked", arg=>{
        console.log("Liked " + arg)
        increaseLikes(arg)
    })

    function increaseLikes(id) {
        Log.findOneAndUpdate({_id:id}, {$inc: {'likes': 1 }}, {new: true})
        .then(log => {
            io.emit("UpdateLikes", {_id: id})//, likes: log.likes})
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    socket.on("disconnect", ()=>{
        console.log("client disconnected ")
    })
})

