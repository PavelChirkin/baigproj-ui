import {Form, Formik} from 'formik';
import {Alert, Button, CircularProgress, Paper} from '@mui/material';
import * as Yup from 'yup';
import TextFieldInput from "./TextFieldInput";
import Container from "@mui/material/Container";
import '../../style.css'
import {createComment} from "../../api/postApi";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

const validationSchema = Yup.object().shape({
    text: Yup.string()
        .min(5, 'Value must be more than 5')
        .required()
});

export default () => {
    const [notification, setNotification] = useState({isVisible: false, message:'', severity: ''});
    const {postId} = useParams();
    const onCreateComment = (comment, helpers) => {
        createComment(postId)
            .then(({status}) => {
                if(status === 201) {
                    setNotification({isVisible: true, message: 'Post created successfully', severity: 'success'});
                    helpers.resetForm();
                }
            })
            .catch((error) => setNotification({isVisible: true, message: 'Something goes wrong', severity: 'error'}))
            .finally(() => helpers.setSubmitting(false));
    }

    const {t} = useTranslation('CreateComment');

    return (

        <Formik initialValues={{
            text: ''

        }}
                onSubmit={onCreateComment}
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
                            <TextFieldInput error={props.touched.text && !!props.errors.anons}
                                            fieldName="text"
                                            label={t('text')}
                                            placeholder="Type anons..."
                                            multiline
                                            rows={3}/>
                            {
                                props.isSubmitting ? <CircularProgress/> : <Button type="submit">{t('submit')}</Button>
                            }
                        </Form>
                    </Paper>
                </Container>
            )}
        </Formik>
    )
}