import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {NavLink} from "react-router-dom";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: "antiquewhite",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    inputRoot: {
        color: 'inherit',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));



export default function Header(props) {
    const classes = useStyles();
    const { sections, title } = props;

    const {t} = useTranslation('Header');

    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>

                <Link
                    variant="button"
                    color="primary"
                    to="/posts/create"
                    sx={{my: 1, mx: 1.5}}
                    component={NavLink}>
                    {t('Create new post')}
                </Link>
                <Link
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    to="/"
                    noWrap
                    className={classes.toolbarTitle}
                    component={NavLink}
                >
                    {t('My Blog')}
                </Link>
                <IconButton>
                    <SearchIcon />
                </IconButton>

                <Button variant="outlined"
                        sx={{my: 1, mx: 1.5}}
                        to="/login"
                        component={NavLink}>
                    {t('Login')}
                </Button>
                <LanguageSwitcher/>
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};