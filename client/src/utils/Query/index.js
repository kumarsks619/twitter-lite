import gql from 'graphql-tag'


export const FETCH_POSTS_QUERY = gql`
query getPosts {
    getPosts {
        id
        username
        author {
            email
            createdAt
        }
        body
        createdAt
        likesCount
        likes {
            id
            username
        }
        commentsCount
        comments {
            id
            username
            body
        }
    }
}
`


export const LOGIN_USER_QUERY = gql`
mutation login (
    $username: String!
    $password: String!
) {
    login (
        username: $username
        password: $password
    ) {
        id
        username
        email
        createdAt
        token
    }
}
`


export const REGISTER_USER_QUERY = gql`
mutation register (
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
) {
    register (
        registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }
    ) {
        id
        username
        email
        createdAt
        token
    }
}
`


export const CREATE_POST_QUERY = gql`
    mutation createPost ($body: String!) {
        createPost (body: $body) {
            id
            username
            createdAt
            likesCount
            likes {
                id
                username
                createdAt
            }
            commentsCount
            comments {
                id
                username
                body
                createdAt
            }
        }
    }
`


export const TOGGLE_LIKE_POST_QUERY = gql`
    mutation toggleLikePost ($postID: ID!) {
        toggleLikePost (postID: $postID) {
            id
            likesCount
            likes {
                id
                username
            }
        }
    }
`


export const FETCH_POST_QUERY = gql`
    query getPost ($postID: ID!) {
        getPost (postID: $postID) {
            id
            username
            body
            createdAt
            likesCount
            likes {
                username
            }
            commentsCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`

export const DELETE_POST_QUERY = gql`
    mutation deletePost ($postID: ID!) {
        deletePost (postID: $postID)
    }
`

export const DELETE_COMMENT_QUERY = gql`
    mutation deleteComment (
        $postID: ID!
        $commentID: ID!
    ) {
        deleteComment (
            postID: $postID
            commentID: $commentID
        ) {
            id
            commentsCount
            comments {
                id
                username
                body
                createdAt
            }
        }
    }
`


export const CREATE_COMMENT_QUERY = gql`
    mutation createComment (
        $postID: ID!
        $body: String!
    ) {
        createComment (
            postID: $postID
            body: $body
        ) {
            id
            commentsCount
            comments {
                id
                body
                username
                createdAt
            }
        }
    }
`