import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from "@mui/material/GlobalStyles";
import Posts from "../pages/Posts";
import {Route, Routes} from "react-router-dom";
import CreatePost from "../forms/CreatePost";



export default () => {
    return (
        <>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Posts/>}/>
                <Route path="/posts/create" element={<CreatePost/>}/>
            </Routes>
        </>
    )
}