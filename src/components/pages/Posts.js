import {useEffect, useState, useStyles} from "react";
import {getPosts} from "../../api/postApi";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import '../../style.css'

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
            .then(({data}) => setPosts(data))
            .catch((error) => console.log(error))
    }, []);

    return (
        <Container className="cardGrid" maxWidth="md">
            <Grid container spacing={4}>
                {posts.map((post) => (
                    <Grid item key={post.id} xs={12} sm={6} md={4}>
                        <Card className="card">
                            <CardContent className="cardContent">
                                <Typography gutterBottom variant="h5" component="h2">
                                    {post.title}
                                </Typography>
                                <Typography>
                                    {post.anons}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    View
                                </Button>
                                <Button size="small" color="primary">
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Posts;