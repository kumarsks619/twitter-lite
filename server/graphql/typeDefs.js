const { gql } = require("apollo-server");



module.exports = gql`
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        createdAt: String!
        token: String!
    }

    type Comment {
        id: ID!
        username: String!
        body: String!
        createdAt: String!
    }

    type Like {
        id: ID!
        username: String!
        createdAt: String!
    }

    type Post {
        id: ID!
        username: String!
        body: String!
        createdAt: String!
        commentsCount: Int!
        comments: [Comment]!
        likesCount: Int!
        likes: [Like]!
    }

    type Query {
        getPosts: [Post]!
        getPost(postID: ID!): Post
    }

    type Mutation {
        register (registerInput: RegisterInput!): User!
        login (username: String!, password: String!): User!
        createPost (body: String!): Post!
        deletePost (postID: ID!): ID!
        createComment (postID: ID!, body: String!): Post!
        deleteComment (postID: ID!, commentID: ID!): Post!
        toggleLikePost (postID: ID!): Post!
    }
`;
