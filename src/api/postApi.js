import HTTP from "./index";

const getPosts = () => HTTP.get('/posts');
const createPost = (data) => HTTP.post('/posts', data);
const getPost = (postId) => HTTP.get("/posts/"+ postId);
const updatePost = (data) => HTTP.put('/posts', data);
const deletePost = (postId) => HTTP.delete("/posts/"+ postId);
const getAllCommentsByPostId = (postId) => HTTP.get('/posts/'+postId+'/comments');
const deleteComment =(postId, commentId) => HTTP.delete('/posts/'+ postId +'/comments/'+ commentId);
const createComment =(postId) => HTTP.post('/posts/postId/comments');

export {getPosts, createPost, getPost, updatePost, deletePost, getAllCommentsByPostId, deleteComment, createComment}