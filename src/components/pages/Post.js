import {useParams} from "react-router-dom";
import {getPost} from "../../api/postApi";
import {useEffect, useState} from "react";

const Post = () => {

    const {postId} = useParams();

    useEffect(() => {
        getPost(postId)
            .then(({data}) => setPost(data))
            .catch((error) => console.log(error));
    }, []);

    const [post, setPost] = useState([]);

    return (
        <>
            Post : {post}
        </>
    )
}
export default Post;