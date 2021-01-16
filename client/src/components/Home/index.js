import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Loader, Transition } from 'semantic-ui-react'

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
                    loading ? <Loader active inline="centered">Loading Tweets...</Loader> : (
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
