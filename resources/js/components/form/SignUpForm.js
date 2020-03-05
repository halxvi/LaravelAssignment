import React from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import "../../../../public/css/login.css";
import "../../../../public/js/passwordToggle.js";
import FormikValidation from './FormikValidation';


const initialValues = {
    name: "",
    email: "",
    password: "",
}

function SignUpForm(props) {
    return (
        <div className="contentBorder">
            <Formik
                initialValues={initialValues}
                validationSchema={FormikValidation}
                onSubmit={(values) => { props.sendSignUp(values) }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="row">
                            <Field name="name" placeholder="お名前" />
                            {errors.name && touched.name ?
                                (<div className="alert alert-danger">
                                    {errors.name}
                                </div>) : null}
                        </div>
                        <div className="row">
                            <Field name="email" className="emailInput" placeholder="メールアドレス" />
                            {errors.email && touched.email ?
                                (<div className="alert alert-danger">
                                    {errors.email}
                                </div>) : null}
                        </div>
                        <div className="row">
                            <Field name="password" className="passwordInput" placeholder="パスワード" />
                            <span className="field-icon">
                                <i toggle="password-field" className="mdi mdi-eye-off toggle-password"></i>
                            </span>
                            {errors.password && touched.password ?
                                (<div className="alert alert-danger">
                                    {errors.password}
                                </div>) : null}
                            <p><small>お名前は20字以内</small></p>
                            <p><small>パスワードは8字以上30字以内</small></p>
                        </div>
                        <div className="row">
                            <input type="hidden" name="_token" value={props.csrf_token}></input>
                            <input type="submit" value="登録"></input>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="row">
                <a data-role="button" type="button" href="/login">ログインはこちら</a>
            </div>
        </div >
    );
}

export default SignUpForm;
