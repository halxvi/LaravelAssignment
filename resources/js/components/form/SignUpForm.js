import React from 'react';
import { Form, Formik, Field } from 'formik';
import PasswordToggle from "../../passwordToggle";
import FormikValidation from './SignupFormValidation';

const initialValues = {
    name: "",
    email: "",
    password: "",
}

function SignUpForm(props) {
    return (
        <div className="content">
            {props.alert && (
                <div className="alert alert-danger content__alert">
                    {props.alert}
                </div>)
            }
            <div className="content__border">
                <Formik
                    initialValues={initialValues}
                    validationSchema={FormikValidation}
                    onSubmit={(values) => { props.sendSignUp(values) }}
                >
                    {({ errors, touched }) => (
                        <Form className="form">
                            <div className="form__name">
                                <Field name="name" className="form__input" placeholder="お名前" />
                                {errors.name && touched.name ?
                                    (<div className="form__alert">
                                        <span className="alert alert-danger">{errors.name}</span>
                                    </div>) : null}
                                <p className="form__p"><small>お名前は20字以内</small></p>
                            </div>
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
                                <p className="form__p"><small>パスワードは8字以上30字以内</small></p>
                                {errors.password && touched.password ?
                                    (<div className="form__alert">
                                        <span className="alert alert-danger">{errors.password}</span>
                                    </div>) : null}
                            </div>
                            <div className="form__submit">
                                <input type="submit" className="form__btn" value="登録" />
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="link">
                    <a data-role="button" type="button" className="link__btn" href="/login">ログインはこちら</a>
                </div>
            </div >
        </div>
    );
}

export default SignUpForm;
