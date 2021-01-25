import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from 'apollo-link-context'

import { AuthProvider } from './utils/Context/auth'
import App from './App'


const httpLink = createHttpLink({
    uri: 'https://twitter-lite-619.herokuapp.com/'
})


const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken")
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : "" 
        }
    }
})


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})


ReactDOM.render(
    <ApolloProvider client={client}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ApolloProvider>,
    document.getElementById('root')
)