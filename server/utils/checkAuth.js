require('dotenv').config({ path: '../.env' })
const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')


module.exports = (context) => {
    const authHeader = context.req.headers.authorization
    if (authHeader) {
        const token = authHeader.split("Bearer ")[1]
        if (token) {
            try {
                const authUser = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
                return authUser
            } catch (err) {
                throw new AuthenticationError("Invalid/Expired Token")
            }
        } else
            throw new Error("Token must be provided in the auth header as 'Bearer <TOKEN>")
    } else 
        throw new Error("Authorization headers must be provided")
}