import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from "@mui/material/GlobalStyles";
import Posts from "../pages/Posts";
import {Route, Routes} from "react-router-dom";
import CreatePost from "../forms/CreatePost";
import UpdatePost from "../forms/UpdatePost";
import Post from "../pages/Post";
import {makeStyles} from "@material-ui/core/styles";
import Image from "../../img/texturetastic_gray.png";
import Login from "../forms/Login";
import UserForm from "../forms/UserForm";
import SecuredRoute from "../security/SecuredRoute";
import CreateComment from "../forms/CreateComment";



const useStyles = makeStyles((theme) => ({
    toolbar: {
        backgroundImage: Image,
    },

}));

export default () => {
    return (
        <>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Posts/>}/>
                <Route path="/posts/view/:postId" element={<Post/>}/>
                <Route path="/posts/create" element={<SecuredRoute/>}>
                    <Route path="/posts/create" element={<CreatePost/>}/>
                </Route>
                <Route path="/posts/update/:postId" element={<SecuredRoute/>}>
                <Route path="/posts/update/:postId" element={<UpdatePost/>}/>
                </Route>
                <Route path="/posts/:postId/comments" element={<SecuredRoute/>}>
                <Route path="/posts/:postId/comments" element={<CreateComment/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/users/registration" element={<SecuredRoute roles={['ADMIN']}/>}>
                    <Route path="/users/registration" element={<UserForm/>}/>
                </Route>
            </Routes>
        </>
    )
}