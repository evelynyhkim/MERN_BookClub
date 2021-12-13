const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    aname: {
        type: String,
        required: [true, 'Log must have a name'],
        minLength: [3, 'Log name must be at least 3 characters'],
        unique: true
    }
    // ptype: {
    //     type: String,
    //     required: [true, 'Log must have a type'],
    //     minLength: [3, 'Log type must be at least 3 characters']
    // },
    // pdescription: {
    //     type: String,
    //     required: [true, 'Log must have a description'],
    //     minLength: [3, 'Description must be at least 3 characters']
    // },
    // pskills: {
    //     type : Array, 
    //     default : [], 
    //     validate: {
    //         validator: function(val) {
    //             return val.length < 4
    //         },
    //         message: 'Log cannot have more than 3 skills'
    //     }
    // },
    // plikes: {
    //     type: Number,
    //     default: 0
    // }
}, {timestamp: true})

const Log = mongoose.model("Log", LogSchema)

module.exports = Log