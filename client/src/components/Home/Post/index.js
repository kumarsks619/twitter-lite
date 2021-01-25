import React, { useContext } from 'react'
import { Card, Image } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../../utils/Context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import CommentButton from './CommentButton'
import MyPopup from '../../../utils/UtilComponents/MyPopup'

 
function Post({ post: { id, username, body, createdAt, likesCount, likes, commentsCount, author }}) {

    const context = useContext(AuthContext)
    
    return (
        <Card fluid>
            <Card.Content as={Link} to={`/posts/${id}`}>
                <MyPopup header={author.email} content={`Joined ${moment(author.createdAt).from()}`}>
                    <Image
                        floated="right"
                        size="mini"
                        src={`https://avatars.dicebear.com/api/human/${username}.svg`}
                    />
                </MyPopup>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton post={{ id, likesCount, likes }} user={context.user} />
                <CommentButton postID={id} commentsCount={commentsCount} />
                {  context.user && context.user.username === username && <DeleteButton postID={id} redirect={false} /> }
            </Card.Content>
        </Card>
    );
}

export default Post
