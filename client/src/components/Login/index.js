import React, { useState, useContext } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { useForm } from '../../utils/Hooks/useForm'
import { AuthContext } from '../../utils/Context/auth'
import { LOGIN_USER_QUERY } from '../../utils/Query'



function Login() {
    const context = useContext(AuthContext)
    const { inputValues, handleOnChange, handleOnSubmit } = useForm({
        username: "",
        password: "",
    }, hoistLoginUser)
    const [errors, setErrors] = useState({})
    const history = useHistory()

    const [ loginUser, { loading }] = useMutation(LOGIN_USER_QUERY, {
        variables: inputValues,
        update: (_, result) => {
            context.login(result.data.login)
            history.push('/')
        },
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors)
    })

    function hoistLoginUser() {
        return loginUser()
    }

    return (
        <div className="register">
            <Form onSubmit={handleOnSubmit} loading={loading}>
                <h1>Login</h1>
                <Form.Input
                    type="text" 
                    label="Username"
                    placeholder="user_name"
                    name="username"
                    value={inputValues.username}
                    onChange={handleOnChange}
                    error={ errors.username ? true : false }
                />
                <Form.Input
                    type="password" 
                    label="Password"
                    placeholder="secret123"
                    name="password"
                    value={inputValues.password}
                    onChange={handleOnChange}
                    error={ errors.password ? true : false }
                />
                <Button type="submit" primary>Login</Button>
            </Form>
            {
                Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {
                                Object.values(errors).map(error => (
                                    <li key={error}>{error}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}




export default Login
