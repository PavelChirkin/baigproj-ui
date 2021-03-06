import {Form, Formik} from 'formik';
import {Alert, Button, CircularProgress, Paper} from '@mui/material';
import * as Yup from 'yup';
import TextFieldInput from "./TextFieldInput";
import Container from "@mui/material/Container";
import '../../style.css'
import {createPost, getPost, updatePost} from "../../api/postApi";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(5, 'Value must be more than 5')
        .required(),
    category: Yup.string()
        .required(),
    anons: Yup.string()
        .max(120, 'Value must be less than 120')
        .required(),
    fulltext: Yup.string()
        .min(10, 'Value must be more than 10')
        .required()
});

export default () => {

    const [notification, setNotification] = useState({isVisible: false, message: '', severity: ''});
    const {postId} = useParams();
    const [post, setPost] = useState({});
    const {t} = useTranslation('UpdatePost');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getPost(postId)
            .then(({data}) => {
                console.log(data);
                setPost(data);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    const onUpdatePost = (post, helpers) => {
        updatePost(post)
            .then(({status}) => {
                if(status === 202) {
                    setNotification({isVisible: true, message: 'Post updated successfully', severity: 'success'});
                    helpers.resetForm();
                }
            })
            .catch((error) => setNotification({isVisible: true, message: 'Something goes wrong', severity: 'error'}))
            .finally(() => helpers.setSubmitting(false));
    }


    return (
        <>
            {
                loading ? <div>Loading</div> :


                    <Formik initialValues={post}
                        // initialValues={props.post}
                            onSubmit={onUpdatePost}
                            validationSchema={validationSchema}>
                        {props => (
                            <Container maxWidth="sm">
                                <Paper elevation={3} sx={{p: 1}}>
                                    {
                                        notification.isVisible &&
                                        <Alert severity={notification.severity} sx={{width: '100%'}}>
                                            {notification.message}
                                        </Alert>
                                    }
                                    <Form className="post-form">
                                        <TextFieldInput error={post.title && !!props.errors.title}
                                                        fieldName="title"
                                                        label={t('title')}
                                                        placeholder="Type title..."/>
                                        <TextFieldInput error={props.touched.category && !!props.errors.category}
                                                        fieldName="category"
                                                        label={t('category')}/>
                                        <TextFieldInput error={props.touched.anons && !!props.errors.anons}
                                                        fieldName="anons"
                                                        label={t('anons')}
                                                        placeholder="Type anons..."
                                                        multiline
                                                        rows={3}/>
                                        <TextFieldInput error={props.touched.fulltext && !!props.errors.fulltext}
                                                        fieldName="fulltext"
                                                        label={t('fulltext')}
                                                        placeholder="Type yours post text..."
                                                        multiline
                                                        rows={6}/>
                                        {
                                            props.isSubmitting ? <CircularProgress/> :
                                                <Button type="submit">{t('submit')}</Button>
                                        }
                                    </Form>
                                </Paper>
                            </Container>
                        )}
                    </Formik>
            }
        </>
    )
}