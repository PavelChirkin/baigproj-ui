import {Form, Formik} from 'formik';
import {Button, CircularProgress, Paper} from '@mui/material';
import * as Yup from 'yup';
import TextFieldInput from "./TextFieldInput";
import Container from "@mui/material/Container";
import '../../style.css'
import {useTranslation} from "react-i18next";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required(),
    surname: Yup.string()
        .required(),
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .required('Password is required'),
    repassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default () => {
    const {t} = useTranslation('UserForm');

return (
    <Formik initialValues={{
        name: '',
        surname: '',
        email: '',
        password: '',
        repassword: ''
    }}
            onSubmit={(values, helpers) => {
                helpers.setSubmitting(true);
                setTimeout(() => {
                    helpers.setSubmitting(false);
                }, 5000);
            }}
            validationSchema={validationSchema}>
        {props => (
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{p: 1}}>
                    <Form className="product-form">
                        <TextFieldInput
                            error={props.touched.name && !!props.errors.name}
                            fieldName="name" label={t('name')}
                            placeholder="Enter your name..."/>
                        <TextFieldInput error={props.touched.surname && !!props.errors.surname}
                                        fieldName="surname" label={t('surname')}
                                        placeholder="Enter your surname..."/>
                        <TextFieldInput error={props.touched.email && !!props.errors.email}
                                        fieldName="email" label={t('email')}
                                        placeholder="Enter your email..."/>
                        <TextFieldInput error={props.touched.password && !!props.errors.password}
                                        fieldName="password" label={t('password')}
                                        placeholder="Type password..."
                                        type="password"/>
                        <TextFieldInput error={props.touched.repassword && !!props.errors.repassword}
                                        fieldName="repassword" label={t('repassword')}
                                        placeholder="Repeat password..."
                                        type="password"/>
                        {
                            props.isSubmitting ?
                                <CircularProgress/> :
                                <Button type="submit">Submit</Button>
                        }
                    </Form>
                </Paper>
            </Container>
        )}
    </Formik>
)
}