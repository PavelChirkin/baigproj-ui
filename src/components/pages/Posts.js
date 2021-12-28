import React, {useEffect, useState, useStyles} from "react";
import {deletePost, getPosts} from "../../api/postApi";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import '../../style.css'
import {NavLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import {useTranslation} from "react-i18next";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PreviewIcon from '@mui/icons-material/Preview';


const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
            .then(({data}) => setPosts(data))
            .catch((error) => console.log(error))
    }, []);

    const onDeletePost = (postId) => {
        deletePost(postId)
            .then(() => { posts.filter(p => p.id !== postId);
            })
            .catch((error) => console.log(error))
    };

    const {t} = useTranslation();

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
                                <Typography>
                                    {post.id}
                                </Typography>
                                <Typography>
                                   Comments: {post.commentSet.length}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link
                                    variant="button"
                                    color="text.primary"
                                    to={`/posts/view/${post.id}`}
                                    sx={{my: 1, mx: 1.5}}
                                    component={NavLink}>
                                    <PreviewIcon fontSize="large"/>
                                </Link>
                                <Button className="single_button"
                                        variant="outlined"
                                        color="error"
                                        onClick={() => onDeletePost(post.id)}>
                                    <DeleteForeverIcon/>
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