import HTTP from "./index";

const getPosts = () => HTTP.get('/posts');
const createPost = (data) => HTTP.post('/posts', data);

export {getPosts, createPost}