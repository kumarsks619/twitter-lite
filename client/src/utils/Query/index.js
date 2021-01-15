import gql from 'graphql-tag'


export const FETCH_POSTS_QUERY = gql`
query {
    getPosts {
        id
        username
        body
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