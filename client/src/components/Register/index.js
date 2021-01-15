import React, { useState, useContext } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { useForm } from '../../utils/Hooks/useForm'
import { AuthContext } from '../../utils/Context/auth'
import { REGISTER_USER_QUERY } from '../../utils/Query'


function Register() {
    const context = useContext(AuthContext)
    const { inputValues, handleOnChange, handleOnSubmit } = useForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    }, hoistRegisterUser)
    const [errors, setErrors] = useState({})
    const history = useHistory()

    const [ registerUser, { loading }] = useMutation(REGISTER_USER_QUERY, {
        variables: inputValues,
        update: (_, result) => {
            context.login(result.data.register)
            history.push('/')
        },
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors)
    })

    function hoistRegisterUser() {
        return registerUser()
    }


    return (
        <div className="register">
            <Form onSubmit={handleOnSubmit} loading={loading}>
                <h1>Register</h1>
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
                    type="email" 
                    label="Email"
                    placeholder="user@gmail.com"
                    name="email"
                    value={inputValues.email}
                    onChange={handleOnChange}
                    error={ errors.email ? true : false }
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
                <Form.Input 
                    type="password"
                    label="Confirm Password"
                    placeholder="secret123"
                    name="confirmPassword"
                    value={inputValues.confirmPassword}
                    onChange={handleOnChange}
                    error={ errors.password ? true : false }
                />
                <Button type="submit" primary>Register</Button>
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




export default Register
