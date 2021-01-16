const { AuthenticationError, UserInputError } = require('apollo-server')

const Post = require('../../models/Post')
const checkAuth = require('../../utils/checkAuth')


module.exports = {
    Query: {
        getPosts: async () => {
            try {
                const foundPosts = await Post.find().sort({ createdAt: -1 })
                return foundPosts
            } catch (err) {
                throw new Error(err)
            }
        },

        getPost: async (_, { postID }) => {
            try {
                const foundPost = await Post.findById(postID)
                if (foundPost)
                    return foundPost
                else
                    throw new Error("Post NOT found")
            } catch (err) {
                throw new Error(err)
            }
        }
    },


    Mutation: {
        createPost: async (_, { body }, context) => {
            const authUser = checkAuth(context)

            if (body.trim() === "")
                throw new UserInputError("Post body must not be empty", {
                    errors: {
                        body: "Post body must not be empty"
                    }
                })

            const newPost = new Post({
                body,
                user: authUser.id,
                username: authUser.username,
                createdAt: new Date().toISOString()
            })

            const savedPost = await newPost.save()

            return savedPost
        },

        deletePost: async (_, { postID }, context) => {
            const authUser = checkAuth(context)

            try {
                const foundPost = await Post.findById(postID)
                if (!foundPost)
                    throw new Error("Post NOT found")
                else {
                    if (authUser.username === foundPost.username) {
                        await foundPost.delete()
                        return foundPost._id
                    } else
                        throw new AuthenticationError("Action NOT allowed")
                }
            } catch (err) {
                throw new Error(err)
            }
        },
        
        createComment: async (_, { postID, body }, context) => {
            const authUser = checkAuth(context)

            if (body.trim() === "")
                throw new UserInputError("Empty comment", {
                    errors: {
                        body: "Comment body must not be empty"
                    }
                })

            const foundPost = await Post.findById(postID)

            if (foundPost) {
                foundPost.comments.unshift({
                    username: authUser.username,
                    body,
                    createdAt: new Date().toISOString()
                })

                await foundPost.save()
                return foundPost
            } else 
                throw new UserInputError("Post NOT found")
        },

        deleteComment: async (_, { postID, commentID }, context) => {
            const authUser = checkAuth(context)

            const foundPost = await Post.findById(postID)
            if (foundPost) {
                const foundCommentIndex = foundPost.comments.findIndex(comment => comment.id === commentID)

                if (foundCommentIndex == -1)
                    throw new UserInputError("Comment NOT found")
                else {
                    if (foundPost.comments[foundCommentIndex].username === authUser.username) {
                        foundPost.comments.splice(foundCommentIndex, 1)
                        await foundPost.save()
                        return foundPost
                    } else
                        throw new AuthenticationError("Action NOT allowed")
                }
            } else 
                throw new UserInputError("Post NOT found")
        },
        
        toggleLikePost: async (_, { postID }, context) => {
            const authUser = checkAuth(context)

            const foundPost = await Post.findById(postID)
            if (foundPost) {
                if (foundPost.likes.find(like => like.username === authUser.username)) {
                    // post already liked
                    foundPost.likes = foundPost.likes.filter(like => like.username !== authUser.username)
                } else {
                    // post not liked, so like the post
                    foundPost.likes.push({
                        username: authUser.username,
                        createdAt: new Date().toISOString()
                    }) 
                }
                await foundPost.save()
                return foundPost
            } else
                throw new UserInputError("Post NOT found")
        }
    }
}