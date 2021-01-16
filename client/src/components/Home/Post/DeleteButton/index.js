import React, { useState } from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { DELETE_POST_QUERY, FETCH_POSTS_QUERY, DELETE_COMMENT_QUERY } from '../../../../utils/Query'
import MyPopup from '../../../../utils/UtilComponents/MyPopup'


function DeleteButton({ postID, redirect, commentID }) {
    const history = useHistory()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const MUTATION_QUERY = commentID ? DELETE_COMMENT_QUERY : DELETE_POST_QUERY

    const [deletePostOrComment] = useMutation(MUTATION_QUERY, {
        variables: {
            postID,
            commentID
        },
        update: (proxy, result) => {
            setIsConfirmOpen(false)
            
            if (!commentID) {
                const cacheData = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                })
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: [...cacheData.getPosts.filter(post => post.id !== result.data.deletePost)]
                    }
                })
            }

            if (redirect)
                history.push('/')
        }
    })

    return (
        <>
            <MyPopup content={ commentID ? "Delete Comment" : "Delete Tweet" }>
                <Button 
                    as="div" 
                    color="red" 
                    floated="right"
                    onClick={() => setIsConfirmOpen(true)}
                >
                    <Icon name="trash alternate outline" style={{ margin: 0 }} />
                </Button>
            </MyPopup>
            <Confirm
                size="mini" 
                open={isConfirmOpen}
                onCancel={() => setIsConfirmOpen(false)}
                onConfirm={deletePostOrComment}
            />
        </>
    )
}

export default DeleteButton