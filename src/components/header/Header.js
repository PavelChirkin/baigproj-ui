import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {NavLink, useNavigate} from "react-router-dom";
import LanguageSwitcher from "../languageSwitcher/LanguageSwitcher";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {CardActions, Divider} from "@material-ui/core";
import {removeUser} from "../../store/slice/userSlice";


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
    const user = useSelector(state => state.user.user);
    const classes = useStyles();
    const {sections, title} = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {t} = useTranslation('Header');
    const onLogout = () => {
        dispatch(removeUser());
        navigate("/");
    }

    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
                {user &&
                <>
                    <CardActions>
                        <Button variant="outlined"
                                sx={{my: 1, mx: 1.5}}
                                to="/posts/create"
                                component={NavLink}>
                            {t('Create new post')}
                        </Button>
                        {
                            user.roles.includes('ADMIN') &&
                            <Button variant="outlined"
                                    sx={{my: 1, mx: 1.5}}
                                    to="/users/registration"
                                    component={NavLink}>
                                {t('Create new user')}
                            </Button>
                        }
                    </CardActions>
                </>
                }
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
                <CardActions>
                    {user ?
                    <Button variant="outlined"
                            sx={{my: 1, mx: 1.5}}
                            to="/login"
                            onClick={onLogout}>
                        {t('Logout')}
                    </Button>
                    :
                        <Button variant="outlined"
                        sx={{my: 1, mx: 1.5}}
                        to="/login"
                        component={NavLink}>
                        {t('Login')}
                        </Button>
                    }
                    <LanguageSwitcher/>
                </CardActions>
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};