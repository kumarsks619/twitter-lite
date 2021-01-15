import React from 'react'
import { Card, Image, Button, Label, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

 
function Post({ post: { id, username, body, createdAt, likesCount, likes, commentsCount, comments }}) {

    const handleLikeToggle = () => {

    }

    const handleComment = () => {
        
    }
    
    return (
        <Card fluid>
            <Card.Content as={Link} to={`/posts/${id}`}>
                <Image
                    floated="right"
                    size="mini"
                    src={`https://avatars.dicebear.com/api/human/${username}.svg`}
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as="div" labelPosition="right" onClick={handleLikeToggle}>
                    <Button color="teal" basic>
                        <Icon name="heart" />
                    </Button>
                    <Label basic color="teal" pointing="left">
                        {likesCount}
                    </Label>
                </Button>
                <Button as="div" labelPosition="right" onClick={handleComment}>
                    <Button color="blue" basic>
                        <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                        {commentsCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    );
}

export default Post
