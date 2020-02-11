@extends('layout')

@section('header')
<link rel="stylesheet" href="{{asset('css/login.css')}}">
<link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.8.95/css/materialdesignicons.min.css" crossorigin="anonymous">
@endsection

@section('content')
<div class="contentBorder">
    <form action="login/auth" method="POST">
        <div class="row">
            <input type="email" class="emailInput"name="email" placeholder="メールアドレス" value="{{old('email')}}">
            @if($errors->first('email'))
                <div class="alert alert-danger">{{$errors->first('email')}}</div>
            @endif
        </div>
        <div class="row">
            <input type="password" name="password" placeholder="パスワード">
            <span class="field-icon">
                <i toggle="password-field" class="mdi mdi-eye toggle-password"></i>
            </span>
            @if($errors->first('password'))
                <div class="alert alert-danger">{{$errors->first('password')}}</div>
            @endif
        </div>
        <div class="row">
            <div class="label">
            <label>ログイン状態を維持する
            <input type="checkbox" name="rememberMe" value="1">
            </label></div>
            @csrf
            <input type="submit" value="ログイン">
        </div>
    </form>
    <div class="row">
    <a data-role="button" type="button" href="/signup">アカウント登録はこちら</a>
    </div>
</div>
<script type="text/javascript" src="{{asset('js/passwordToggle.js')}}"></script>
@stop
