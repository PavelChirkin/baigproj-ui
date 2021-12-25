import {useEffect, useState} from "react";
import {getPosts} from "../../api/postApi";

export default () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
            .then(({data}) => setPosts(data))
            .catch((error) => console.log(error))
    }, []);

    return (
        <>{JSON.stringify(posts)}</>
    )
}