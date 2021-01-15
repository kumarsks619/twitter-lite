import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid } from 'semantic-ui-react'

import Post from './Post'
import { AuthContext } from '../../utils/Context/auth'
import PostForm from './PostForm'
import { FETCH_POSTS_QUERY } from '../../utils/Query'


function Home() {
    const context = useContext(AuthContext)
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)


    return (
        <Grid columns={3}>
            <Grid.Row className="home__heading">
                <h1>Tweets</h1>
            </Grid.Row>
            {
                context.user && (
                    <Grid.Row>
                        <PostForm />
                    </Grid.Row>
                )
            }
            <Grid.Row>
                {
                    loading ? <h1>Loading tweets...</h1> : (
                        data?.getPosts.map(post => (
                            <Grid.Column key={post.id} style={{ marginBottom: '30px' }}>
                                <Post post={post} />
                            </Grid.Column>
                        ))
                    )
                }
            </Grid.Row>
        </Grid>
    );
}



export default Home
