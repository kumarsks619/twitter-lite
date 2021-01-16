import React, { useState } from 'react'
import { Form, Button, TextArea } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { useForm } from '../../../utils/Hooks/useForm'
import { CREATE_POST_QUERY, FETCH_POSTS_QUERY } from '../../../utils/Query'



function PostForm() {
    const { inputValues, handleOnChange, handleOnSubmit } = useForm({
        body: ""
    }, hoistCreatePost)
    const [errors, setErrors] = useState({})

    const [createPost] = useMutation(CREATE_POST_QUERY, {
        variables: inputValues,
        update(proxy, result) {
            const cacheData = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [result.data.createPost, ...cacheData.getPosts]
                }
            })
            inputValues.body = ""
        },
        onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors)
    });

    function hoistCreatePost() {
        return createPost()
    }

    return (
        <>
            <Form onSubmit={handleOnSubmit} className="postForm__formWrapper">
                <h2>Say Something!</h2>
                <Form.Field className="postForm__textAreaWrapper">
                    <TextArea
                        className="postForm__textArea" 
                        rows={2} 
                        placeholder="Hi World!"
                        name="body"
                        value={inputValues.body}
                        onChange={handleOnChange}
                    />
                    <Button type="submit" color="teal" className="postForm__submitBtn">Tweet</Button>
                </Form.Field>
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
        </>
    )
}




export default PostForm
