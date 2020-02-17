import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'emailErrorMsg': null,
            'pwErrorMsg': null,
        }
    }

    render() {
        return (
            <div className="contentBorder">
                <form action="login/auth" method="POST">
                    <div className="row">
                        <input type="email" className="emailInput" name="email" placeholder="メールアドレス"></input>
                        {/* @if($errors->first('email'))
                <div className="alert alert-danger">{{ $errors-> first('email')}}</div>
                        @endif */}
                        {this.state.emailErrorMsg && (
                            <div className="alert alert-danger">{this.state.emailErrorMsg}</div>
                        )}
                    </div>
                    <div className="row">
                        <input type="password" name="password" placeholder="パスワード"></input>
                        <span className="field-icon">
                            <i toggle="password-field" className="mdi mdi-eye-off toggle-password"></i>
                        </span>
                        {/* @if($errors->first('password'))
                <div className="alert alert-danger">{{ $errors-> first('password')}}</div>
                        @endif */}
                        {this.state.pwErrorMsg && (
                            <div className="alert alert-danger">{this.state.pwErrorMsg}</div>
                        )}
                    </div>
                    <div className="row">
                        <div className="label">
                            <label>ログイン状態を維持する
                        <input type="checkbox" name="rememberMe" value="1"></input>
                            </label>
                        </div>
                        <input type="hidden" name="_token" value={csrf_token}></input>
                        <input type="submit" value="ログイン"></input>
                    </div>
                </form>
                <div className="row">
                    <a data-role="button" type="button" href="/signup">アカウント登録はこちら</a>
                </div>
            </div >
        );
    }
}
if (document.getElementById('loginForm')) {
    ReactDOM.render(<LoginForm />, document.getElementById('loginForm'));
}

