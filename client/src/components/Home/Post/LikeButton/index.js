import React, { useState, useEffect } from 'react'
import { Button, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { TOGGLE_LIKE_POST_QUERY } from '../../../../utils/Query'
import MyPopup from '../../../../utils/UtilComponents/MyPopup'



function LikeButton({ post: { id, likesCount, likes }, user}) {
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username))
            setIsLiked(true)
        else
            setIsLiked(false)
    }, [user, likes])

    const [toggleLikePost] = useMutation(TOGGLE_LIKE_POST_QUERY, {
        variables: { postID: id }
    })

    return (
        <MyPopup content={ isLiked ? "Unlike" : "Like" }>
            <Button as="div" labelPosition="right">
                {
                    user ? (
                        <Button color="teal" basic={!isLiked} onClick={toggleLikePost}>
                            <Icon name="heart" />
                        </Button>
                    ) : (
                        <Button color="teal" basic as={Link} to="/login">
                            <Icon name="heart" />
                        </Button>
                    )
                }
                <Label basic color="teal" pointing="left">
                    {likesCount}
                </Label>
            </Button>
        </MyPopup>
    )
}

export default LikeButton
