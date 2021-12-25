import Posts from "../pages/Posts";
import {Route, Routes} from "react-router-dom";
import * as PropTypes from "prop-types";
import {CssBaseline} from "@material-ui/core";
import CreatePost from "../forms/CreatePost";


function GlobalStyles(props) {
    return null;
}

GlobalStyles.propTypes = {
    styles: PropTypes.shape({
        ul: PropTypes.shape({
            padding: PropTypes.number,
            margin: PropTypes.number,
            listStyle: PropTypes.string
        })
    })
};
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