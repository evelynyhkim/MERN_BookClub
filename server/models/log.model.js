const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    bookTitle: {
        type: String,
        required: [true, 'Book must have a title'],
        minLength: [2, 'Book title must be at least 2 characters long'],
    },
    writerName: {
        type: String,
        required: [true, 'Writer must have a name'],
        minLength: [2, 'Writer name must be at least 2 characters long'],
    },
    review: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviewDate: {
        type: Date,
        required: [true, 'Review date is required for a log']
    },
    likes: {
        type: Number,
        default: 0
    }

}, {timestamp: true})

const Log = mongoose.model("Log", LogSchema)

module.exports = Log