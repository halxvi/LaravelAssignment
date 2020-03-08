import React from 'react';
import { Form, Formik, Field } from 'formik';
import PasswordToggle from "../../passwordToggle";
import FormikValidation from './LoginFormValidation';

const initialValues = {
    email: "",
    password: "",
}

function LoginForm(props) {
    return (
        <div className="content">
            {props.alert && (
                <div className="content__alert">
                    <span className="alert alert-danger">{props.alert}</span>
                </div>)
            }
            <div className="content__border">
                <Formik
                    initialValues={initialValues}
                    validationSchema={FormikValidation}
                    onSubmit={(values) => { props.sendAuth(values) }}
                >
                    {({ errors, touched }) => (
                        <Form className="form">
                            <div className="form__email">
                                <Field type="email" name="email" className="form__input" placeholder="メールアドレス" />
                                {errors.email && touched.email ?
                                    (<div className="form__alert">
                                        <span className="alert alert-danger">{errors.email}</span>
                                    </div>) : null}
                            </div>
                            <div className="form__password">
                                <span className="form__field-icon">
                                    <i toggle="password-field" className="mdi mdi-eye-off form__toggle-password" onClick={(e) => { PasswordToggle(e) }}></i>
                                </span>
                                <Field type="password" name="password" className="form__input" placeholder="パスワード" />
                                {errors.password && touched.password ?
                                    (<div className="form__alert">
                                        <span className="alert alert-danger">{errors.password}</span>
                                    </div>) : null}
                            </div>
                            <div className="form__submit">
                                <input type="submit" className="form__btn" value="ログイン" />
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="link">
                    <a data-role="button" type="button" className="link__btn" href="/signup">アカウント登録はこちら</a>
                </div>
            </div>
        </div >
    );
}

export default LoginForm;

