import React from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import "../../../../public/css/login.css";
import "../../../../public/js/passwordToggle.js";
import FormikValidation from './FormikValidation';


const initialValues = {
    email: "",
    password: "",
}

function LoginForm(props) {
    return (
        <div className="content">
            <Formik
                initialValues={initialValues}
                validationSchema={FormikValidation}
                onSubmit={(values) => { props.sendAuth(values) }}
            >
                {({ errors, touched }) => (
                    <Form className="form">
                        <div className="form__email">
                            <Field name="email" className="form__email-input" placeholder="メールアドレス" />
                            {errors.email && touched.email ?
                                (<div className="alert alert-danger form__email-alert">
                                    {errors.email}
                                </div>) : null}
                        </div>
                        <div className="form__password">
                            <Field name="password" className="form__password-input" placeholder="パスワード" />
                            <span className="form__field-icon">
                                <i toggle="password-field" className="mdi mdi-eye-off form__toggle-password"></i>
                            </span>
                            {errors.password && touched.password ?
                                (<div className="alert alert-danger form__password-alert">
                                    {errors.password}
                                </div>) : null}
                        </div>
                        <div className="form__submit">
                            <input type="submit" className="form_submit-btn" value="ログイン"></input>
                        </div>
                    </Form>)}
            </Formik>
            <div className="link">
                <a data-role="button" type="button" href="/signup">アカウント登録はこちら</a>
            </div>
        </div >
    );
}

export default LoginForm;

