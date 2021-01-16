import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Transition, Placeholder, Segment } from 'semantic-ui-react'

import Post from './Post'
import { AuthContext } from '../../utils/Context/auth'
import PostForm from './PostForm'
import { FETCH_POSTS_QUERY } from '../../utils/Query'


function Home() {
    const context = useContext(AuthContext)
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)


    return (
        <Grid columns={3}>
            {
                context.user ? (
                    <Grid.Row>
                        <PostForm />
                    </Grid.Row>
                ) : (
                    <Grid.Row>
                        <h1 className="home__heading">Tweets</h1>
                    </Grid.Row>
                )
            }
            <Grid.Row>
                {
                    loading ? (
                        new Array(9).fill(0).map((_, index) => (
                            <Grid.Column  key={`${new Date().toISOString()}${index}`} style={{ marginBottom: 30 }}>
                                <Segment raised>
                                    <Placeholder>
                                        <Placeholder.Header image>
                                            <Placeholder.Line />
                                            <Placeholder.Line />
                                        </Placeholder.Header>
                                        <Placeholder.Paragraph>
                                            <Placeholder.Line length="long" />
                                            <Placeholder.Line length="medium" />
                                            <Placeholder.Line length="short" />
                                        </Placeholder.Paragraph>
                                    </Placeholder>
                                </Segment>
                            </Grid.Column>
                        ))
                    ) : (
                        <Transition.Group>
                            {
                                data?.getPosts.map(post => (
                                    <Grid.Column key={post.id} style={{ marginBottom: '30px' }}>
                                        <Post post={post} />
                                    </Grid.Column>
                                ))
                            }
                        </Transition.Group>
                    )
                }
            </Grid.Row>
        </Grid>
    );
}



export default Home
