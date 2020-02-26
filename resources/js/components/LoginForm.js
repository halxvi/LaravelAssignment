import React from 'react';

function LoginForm(props) {
    return (
        <div className="contentBorder">
            <form action="api/login/auth" method="POST">
                <div className="row">
                    <input type="email" className="emailInput" name="email" placeholder="メールアドレス"></input>
                    {props.emailErrorMessage &&
                        <div className="alert alert-danger">
                            {props.emailErrorMessage}
                        </div>
                    }
                </div>
                <div className="row">
                    <input type="password" name="password" placeholder="パスワード"></input>
                    <span className="field-icon">
                        <i toggle="password-field" className="mdi mdi-eye-off toggle-password"></i>
                    </span>
                    {props.passwordErrorMessage &&
                        <div className="alert alert-danger">
                            {props.passwordErrorMessage}
                        </div>
                    }
                </div>
                <div className="row">
                    <div className="label">
                        <label>ログイン状態を維持する
                        <input type="checkbox" name="rememberMe" value="1"></input>
                        </label>
                    </div>
                    <input type="hidden" name="_token" value={props.csrf_token}></input>
                    <input type="submit" value="ログイン"></input>
                </div>
            </form>
            <div className="row">
                <a data-role="button" type="button" href="/signup">アカウント登録はこちら</a>
            </div>
        </div >
    );
}

export default LoginForm;

