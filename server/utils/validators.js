module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {}

    if (username.trim() === "")
        errors.username = "Username must not be empty"

    if (email.trim() === "")
        errors.email = "Email must not be empty"
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if (!email.match(regEx))
            errors.email = "Email must be a valid email address"
    }

    if (password === "")
        errors.password = "Password must not be empty"
    else if (password !== confirmPassword)
        errors.password = "Password must match"

    return {
        valid: Object.keys(errors).length === 0 ? true : false,
        errors
    }
}


module.exports.validateLoginInput = (username, password) => {
    const errors = {}

    if (username.trim() === "")
        errors.username = "Username must not be empty"
    if (password === "")
        errors.password = "Password must not be empty"

    return {
        valid: Object.keys(errors).length === 0 ? true : false,
        errors
    }    
}