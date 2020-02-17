import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class SignupForm extends Component {
    render() {
        return (
            <div class="contentBorder">
                <form action="signup/confirm" method="POST">
                    <div class="row">
                        <input type="text" name="name" placeholder="お名前"></input>
                        {/* @if($errors->first('name'))
                    <div class="alert alert-danger">{{ $errors-> first('name')}}</div>
                        @endif */}
                    </div>
                    <div class="row">
                        <input type="email" name="email" placeholder="メールアドレス"></input>
                        {/* @if($errors->first('email'))
                    <div class="alert alert-danger">{!!nl2br(e($errors -> first('email')))!!}</div>
                            @endif */}
                    </div>
                    <div class="row">
                        <input type="password" name="password" placeholder="パスワード"></input>
                        <span class="field-icon">
                            <i toggle="password-field" class="mdi mdi-eye-off toggle-password"></i>
                        </span>
                        {/* @if($errors->first('password'))
                    <div class="alert alert-danger">{{ $errors-> first('password')}}</div>
                                @endif */}
                        <p><small>パスワードは8字以上100字以内</small></p>
                    </div>
                    <div class="row">
                        <input type="hidden" name="_token" value={csrf_token}></input>
                        <input type="submit" value="確認画面へ"></input>
                    </div>
                </form>
                <div class="row">
                    <a data-role="button" type="button" href="/login">ログインはこちら</a>
                </div>
            </div>
        );
    }
}

if (document.getElementById('signupForm')) {
    ReactDOM.render(<SignupForm />, document.getElementById('signupForm'));
}
