import { useState } from 'react'


export const useForm = (initialState = {}, callback) => {
    const [inputValues, setInputValues] = useState(initialState)

    const handleOnChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        callback()
    }

    return {
        inputValues,
        handleOnChange,
        handleOnSubmit
    }
}