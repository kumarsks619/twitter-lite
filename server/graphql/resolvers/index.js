const postResovler = require('./post')
const userResolver = require('./user')


module.exports = {
    Post: {
        likesCount: (parent) => parent.likes.length,
        commentsCount: (parent) => parent.comments.length
    },

    Query: {
        ...postResovler.Query
    },

    Mutation: {
        ...userResolver.Mutation,
        ...postResovler.Mutation
    }
}