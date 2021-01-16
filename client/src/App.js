import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'

import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Header from './components/Header'
import AuthRoute from './utils/AuthRoute'
import SinglePost from './components/SinglePost'
import './App.css'



function App() {
    return (
        <Router>
            <Container>
                <Header />
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/register" component={Register} />
                <AuthRoute exact path="/login" component={Login} />
                <Route exact path="/posts/:postID" component={SinglePost} />
            </Container>
        </Router>
    )
}

export default App
