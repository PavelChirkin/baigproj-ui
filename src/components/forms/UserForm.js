import {Form, Formik} from 'formik';
import {Button, CircularProgress, Paper} from '@mui/material';
import * as Yup from 'yup';
import TextFieldInput from "./TextFieldInput";
import Container from "@mui/material/Container";
import '../../style.css'
const validationSchema = Yup.object().shape({
    vardas: Yup.string()
        .required(),
    pavarde: Yup.string()
        .required(),
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .required('Password is required'),
    repassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});
export default () => (
    <Formik initialValues={{
        vardas: '',
        pavarde: '',
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
                            error={props.touched.vardas && !!props.errors.vardas}
                            fieldName="vardas" label="Vardas:"
                            placeholder="Iveskit varda..."/>
                        <TextFieldInput error={props.touched.pavarde && !!props.errors.pavarde}
                                        fieldName="pavarde" label="Pavarde:"
                                        placeholder="Iveskit pavarde..."/>
                        <TextFieldInput error={props.touched.email && !!props.errors.email}
                                        fieldName="email" label="email:"
                                        placeholder="Iveskit email..."/>
                        <TextFieldInput error={props.touched.password && !!props.errors.password}
                                        fieldName="password" label="Password:"
                                        placeholder="Type password..."
                                        type="password"/>
                        <TextFieldInput error={props.touched.repassword && !!props.errors.repassword}
                                        fieldName="repassword" label="Repeat password:"
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