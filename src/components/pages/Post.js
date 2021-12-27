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
                <Paper className="single_post">
                    <h4>Title: {post.title}</h4>
                    <Divider light />
                    <p><b>Anons:</b> {post.anons}</p>
                    <Divider light />
                    <p><b>Category:</b> {post.category}</p>
                    <Divider light />
                    <p><b>Content:</b> {post.fulltext}</p>
                    <Divider light />
                    <div display="inline-flex">
                    <Link
                        variant="button"
                        color="primary"
                        to={`/posts/update/${post.id}`}
                        sx={{my: 1, mx: 1.5}}
                        component={NavLink}>
                        Update Post
                    </Link>
                    <Link
                        variant="button"
                        color="primary"
                        to={`/posts/delete/${post.id}`}
                        sx={{my: 1, mx: 1.5}}
                        component={NavLink}>
                        Delete Post
                    </Link>
                    <Link
                        variant="button"
                        color="primary"
                        to={`/posts/delete/${post.id}`}
                        sx={{my: 1, mx: 1.5}}
                        component={NavLink}>
                        Create Comment
                    </Link>
                </div>
                </Paper>

            </Container>
            <Container maxWidth="sm">
                {comments.map((comment) => (
                    <Card className="card">
                        <CardContent className="cardContent">
                            <Typography gutterBottom variant="subtitle2" component="h2">
                                {comment.text}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link
                                variant="button"
                                color="primary"
                                size="small"
                                to={`/posts/view/${post.id}`}
                                sx={{my: 1, mx: 1.5}}
                                component={NavLink}>
                                Delete comment
                            </Link>
                            <Link
                                variant="button"
                                color="primary"
                                size="small"
                                to={`/posts/view/${post.id}`}
                                sx={{my: 1, mx: 1.5}}
                                component={NavLink}>
                                Edit comment
                            </Link>

                        </CardActions>
                    </Card>
                ))}
            </Container>

        </>
    )
}
export default Post;