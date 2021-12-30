import {NavLink, useParams} from "react-router-dom";
import {getAllCommentsByPostId, getPost} from "../../api/postApi";
import React, {useEffect, useState} from "react";
import {Divider, Paper} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";

const Post = () => {
    const {postId} = useParams();

    useEffect(() => {
        getPost(postId)
            .then(({data}) => setPost(data))
            .catch((error) => console.log(error));
    }, []);
    const [post, setPost] = useState([]);

    useEffect(() => {
        getAllCommentsByPostId(postId)
            .then(({data}) => setComments(data))
            .catch((error) => console.log(error));
    }, []);
    const [comments, setComments] = useState([]);

    return (
        <>
            <Container maxWidth="sm">
                <Card className="card">
                    <CardContent className="cardContent">
                        <h4>Title: {post.title}</h4>
                        <Divider light/>
                        <p><b>Anons:</b> {post.anons}</p>
                        <Divider light/>
                        <p><b>Category:</b> {post.category}</p>
                        <Divider light/>
                        <Typography gutterBottom variant="subtitle2" component="h2">
                            {post.fulltext}
                        </Typography>
                        <Divider light/>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="outlined" color="primary"
                                sx={{my: 1, mx: 1.5}}
                                to={`/posts/update/${post.id}`}
                                component={NavLink}>
                            Update Post
                        </Button>
                        <Button size="small" variant="outlined"
                                sx={{my: 1, mx: 1.5}}
                                to={'/posts/${post.id}/comments'}
                                component={NavLink}>
                            Create Comment
                        </Button>
                    </CardActions>
                </Card>
            </Container>
            <Container maxWidth="sm">
                {comments.map((comment) => (
                    <Card className="card">
                        <CardContent className="cardContent">
                            <Typography gutterBottom variant="subtitle2" component="h1">
                                {comment.text}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="outlined" color="secondary"
                                    sx={{my: 1, mx: 1.5}}
                                    to={'/posts/${post.id}/comments/${comment.id}'}
                                    component={NavLink}>
                                Delete comment
                            </Button>
                            <Button size="small" variant="outlined" color="primary"
                                    sx={{my: 1, mx: 1.5}}
                                    to={'/posts/${post.id}/comments'}
                                    component={NavLink}>
                                Edit comment
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Container>

        </>
    )
}
export default Post;