require('dotenv').config({ path: '../../.env'})
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User')
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')


const genrateToken = (user) => (
    jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' })
)


module.exports = {
    Mutation: {
        register: async (_, { registerInput: { username, email, password, confirmPassword }}) => {
            // validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
            if (!valid)
                throw new UserInputError('Errors', { errors })

            // make sure user doesn't already exists
            const foundUser = await User.findOne({ username })
            if (foundUser)
                throw new UserInputError("Username is taken !!!", { 
                    errors: {
                        username: "This username is already taken !!!"
                    }
                })

            // hash password and create an auth token
            password = await bcrypt.hash(password, 13)
            
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })

            const result = await newUser.save()

            const token = genrateToken(result)

            return {
                ...result._doc,
                id: result._id,
                token
            }
        },

        login: async (_, { username, password }) => {
            const { valid, errors } = validateLoginInput(username, password)
            if (!valid)
                throw new UserInputError('Errors', { errors })

            const foundUser = await User.findOne({ username })
            if (!foundUser) {
                errors.general = "User NOT found"
                throw new UserInputError('User not found', { errors })
            }

            const matchPassword = await bcrypt.compare(password, foundUser.password)
            if (!matchPassword) {
                errors.general = "Wrong credentials"
                throw new UserInputError('Wrong credentials', { errors })
            }

            const token = genrateToken(foundUser)

            return {
                ...foundUser._doc,
                id: foundUser._id,
                token
            }
        }
    }
}