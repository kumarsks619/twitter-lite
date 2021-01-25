const { Schema, model } = require('mongoose')


const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


module.exports = model('Post', postSchema)