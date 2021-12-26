import {Form, Formik} from 'formik';
import {Alert, Button, CircularProgress, Paper} from '@mui/material';
import * as Yup from 'yup';
import TextFieldInput from "./TextFieldInput";
import Container from "@mui/material/Container";
import '../../style.css'
import {createPost} from "../../api/postApi";
import {useState} from "react";

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
    const [notification, setNotification] = useState({isVisible: false, message:'', severity: ''});

    const onCreatePost = (post, helpers) => {
        createPost(post)
            .then(({status}) => {
                if(status === 201) {
                    setNotification({isVisible: true, message: 'Post created successfully', severity: 'success'});
                    helpers.resetForm();
                }
            })
            .catch((error) => setNotification({isVisible: true, message: 'Something goes wrong', severity: 'error'}))
            .finally(() => helpers.setSubmitting(false));
    }

    return (

        <Formik initialValues={{
            title: '',
            anons: '',
            category: '',
            fulltext: ''

        }}
                onSubmit={onCreatePost}
                validationSchema={validationSchema}>
            {props => (
                <Container maxWidth="sm">
                    <Paper elevation={3} sx={{p: 1}}>
                        {
                            notification.isVisible &&
                            <Alert severity={notification.severity} sx={{ width: '100%' }}>
                                {notification.message}
                            </Alert>
                        }
                        <Form className="post-form">
                            <TextFieldInput error={props.touched.name && !!props.errors.title}
                                            fieldName="title"
                                            label="Name:"
                                            placeholder="Type title..."/>
                            <TextFieldInput error={props.touched.category && !!props.errors.category}
                                            fieldName="category"
                                            label="Category:"/>
                            <TextFieldInput error={props.touched.anons && !!props.errors.anons}
                                            fieldName="anons"
                                            label="Anons:"
                                            placeholder="Type anons..."
                                            multiline
                                            rows={3}/>
                            <TextFieldInput error={props.touched.fulltext && !!props.errors.fulltext}
                                            fieldName="fulltext"
                                            label="Post text:"
                                            placeholder="Type yours post text..."
                                            multiline
                                            rows={6}/>
                            {
                                props.isSubmitting ? <CircularProgress/> : <Button type="submit">Submit</Button>
                            }
                        </Form>
                    </Paper>
                </Container>
            )}
        </Formik>
    )
}