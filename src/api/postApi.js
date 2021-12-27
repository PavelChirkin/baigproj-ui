import HTTP from "./index";

const getPosts = () => HTTP.get('/posts');
const createPost = (data) => HTTP.post('/posts', data);
const getPost = (postId) => HTTP.get("/posts/"+ postId);
const getAllCommentsByPostId = (postId) => HTTP.get('/posts/'+postId+'/comments');

export {getPosts, createPost, getPost, getAllCommentsByPostId}