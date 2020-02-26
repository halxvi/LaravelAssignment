import React from 'react';

function SignUpForm(props) {
    return (
        <div className="contentBorder">
            <form action="signup/confirm" method="POST">
                <div className="row">
                    <input type="text" name="name" placeholder="お名前"></input>
                    {props.nameErrorMessage &&
                        <div className="alert alert-danger">
                            {props.nameErrorMessage}
                        </div>
                    }
                </div>
                <div className="row">
                    <input type="email" name="email" placeholder="メールアドレス"></input>
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
                    <p><small>パスワードは8字以上100字以内</small></p>
                </div>
                <div className="row">
                    <input type="hidden" name="_token" value={props.csrf_token}></input>
                    <input type="submit" value="確認画面へ"></input>
                </div>
            </form>
            <div className="row">
                <a data-role="button" type="button" href="/login">ログインはこちら</a>
            </div>
        </div>
    );
}

export default SignUpForm;
