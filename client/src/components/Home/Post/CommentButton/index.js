import React, { useContext } from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../../../utils/Context/auth'
import MyPopup from '../../../../utils/UtilComponents/MyPopup'


function CommentButton({ postID, commentsCount, handleOnClick }) {
    const context = useContext(AuthContext)


    return (
        <MyPopup content="Comment on Tweet">
            {
                handleOnClick && context.user ? (
                    <Button labelPosition="right" as="div" onClick={handleOnClick}>
                        <Button color="blue" basic>
                            <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                            {commentsCount}
                        </Label>
                    </Button>
                ) : (
                    <Button labelPosition="right" as={Link} to={context.user ? `posts/${postID}` : "/login"}>
                        <Button color="blue" basic>
                            <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                            {commentsCount}
                        </Label>
                    </Button>
                )
            }
        </MyPopup>
    )
}

export default CommentButton
