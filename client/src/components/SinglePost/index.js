import React, { useContext, useState, useRef } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Comment, Divider, Form, Header, Item, Loader } from 'semantic-ui-react'
import moment from 'moment'

import { CREATE_COMMENT_QUERY, FETCH_POST_QUERY } from '../../utils/Query'
import { AuthContext } from '../../utils/Context/auth'
import LikeButton from '../Home/Post/LikeButton'
import DeleteButton from '../Home/Post/DeleteButton'
import CommentButton from '../Home/Post/CommentButton'


function SinglePost(props) {
    const postID = props.match.params.postID
    const context = useContext(AuthContext)
    const [commentBody, setCommentBody] = useState("")
    const commentInputRef = useRef(null)

    const { loading, data: { getPost: { id, body, username, createdAt, likesCount, likes, commentsCount, comments } ={} } = {} } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postID
        }
    })
    
    const [createComment, { loading: loadingCreateComment }] = useMutation(CREATE_COMMENT_QUERY, {
        variables: {
            postID,
            body: commentBody
        },
        update: () => {
            setCommentBody("")
            commentInputRef.current.blur()
        }
    })


    return (
        loading ? <Loader active inline="centered" style={{ marginTop: 20 }}>Loading Tweet</Loader> : (
            <Item.Group relaxed>
                <Item>
                    <Item.Image src={`https://avatars.dicebear.com/api/human/${username}.svg`} />
                    <Item.Content verticalAlign="middle">
                        <Item.Header>{ context.user ? context.user.username === username ? "You Said..." : `${username} tweeted...` : `${username} tweeted...` }</Item.Header>
                        <Item.Meta>{moment(createdAt).fromNow()}</Item.Meta>
                        <Item.Description>{body}</Item.Description>
                        <Divider />
                        <Item.Extra>
                            <LikeButton post={{ id, likesCount, likes }} user={context.user} />
                            <CommentButton commentsCount={commentsCount} handleOnClick={() => commentInputRef.current.focus()} />
                            { context.user && context.user.username === username && <DeleteButton postID={id} redirect={true} /> }
                        </Item.Extra>
                        <Comment.Group>
                            <Header as="h3" dividing>
                                Comments
                            </Header>
                            {
                                context.user && (
                                    <Form loading={loadingCreateComment} style={{ margin: "20px 0" }}>
                                        <div className="ui action input fluid">
                                            <input
                                                type="text"
                                                placeholder="comment..."
                                                value={commentBody}
                                                onChange={(e) => setCommentBody(e.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button
                                                type="submit"
                                                className="ui button teal"
                                                disabled={commentBody.trim() === ""}
                                                onClick={createComment}
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    </Form>
                                )
                            }
                            {
                                comments.map(comment => (
                                    <Comment key={comment.id}>
                                        <Comment.Avatar src={`https://avatars.dicebear.com/api/human/${comment.username}.svg`} />
                                        <Comment.Content>
                                            <Comment.Author>{comment.username}</Comment.Author>
                                            <Comment.Metadata>{moment(comment.createdAt).fromNow()}</Comment.Metadata>
                                            <Comment.Text>{comment.body}</Comment.Text>
                                            {
                                                context.user?.username === comment.username && (
                                                    <Comment.Actions style={{ display: "flex" }}>
                                                        <Comment.Action style={{ marginLeft: "auto" }}>
                                                            <DeleteButton postID={postID} commentID={comment.id} />
                                                        </Comment.Action>
                                                    </Comment.Actions>
                                                )
                                            }
                                        </Comment.Content>
                                    </Comment>
                                ))
                            }
                        </Comment.Group>
                    </Item.Content>
                </Item>
            </Item.Group>
        )
    )
}

export default SinglePost
