import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../Context/auth'


const AuthRoute = ({ component: Component, ...rest }) => {
    const context = useContext(AuthContext)

    return (
        <Route 
            {...rest}
            render={(props) => (
                context.user ? <Redirect to="/" /> : <Component {...props} />
            )}
        />
    )
}


export default AuthRoute