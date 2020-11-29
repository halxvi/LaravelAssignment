import React from 'react'
import { Form, Formik, Field } from 'formik'
import PropTypes from 'prop-types'
import PasswordToggle from '../../PasswordToggle'
import formikValidation from './LoginFormValidation'

const initialValues = {
  email: '',
  password: '',
}

function LoginForm(props) {
  const { alert, sendAuth } = props
  return (
    <div className="content">
      {alert && (
        <div className="content__alert">
          <span className="alert alert-danger">{alert}</span>
        </div>
      )}
      <div className="content__border">
        <Formik
          initialValues={initialValues}
          validationSchema={formikValidation}
          onSubmit={(values) => {
            sendAuth(values)
          }}
        >
          {({ errors, touched }) => (
            <Form className="form">
              <div className="form__email">
                <Field
                  type="email"
                  name="email"
                  className="form__input"
                  placeholder="メールアドレス"
                />
                {errors.email && touched.email ? (
                  <div className="form__alert">
                    <span className="alert alert-danger">{errors.email}</span>
                  </div>
                ) : null}
              </div>
              <div className="form__password">
                <div className="form__password-part">
                  <Field
                    type="password"
                    name="password"
                    className="form__input"
                    placeholder="パスワード"
                  />
                  <span className="form__field-icon">
                    <i
                      toggle="password-field"
                      className="mdi mdi-eye-off form__toggle-password"
                      onClick={(e) => {
                        PasswordToggle(e)
                      }}
                    ></i>
                  </span>
                </div>
                {errors.password && touched.password ? (
                  <div className="form__alert">
                    <span className="alert alert-danger">
                      {errors.password}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="form__submit">
                <input type="submit" className="form__btn" value="ログイン" />
              </div>
            </Form>
          )}
        </Formik>
        <div className="link">
          <a
            data-role="button"
            type="button"
            className="link__btn"
            href="/signup"
          >
            アカウント登録はこちら
          </a>
        </div>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  alert: PropTypes.string,
  sendAuth: PropTypes.func,
}

export default LoginForm
