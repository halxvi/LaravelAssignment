@extends('layout')

@section('header')
<link rel="stylesheet" href="{{asset('css/signup.css')}}">
<link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.8.95/css/materialdesignicons.min.css" crossorigin="anonymous">
@endsection

@section('content')
<div class="contentBorder">
    <form action="/signup/confirm" method="POST">
        <div class="row">
            <input type="text" name="name" placeholder="お名前">
            @if($errors->first('name'))
                <div class="alert alert-danger">{{$errors->first('name')}}</div>
            @endif
        </div>
        <div class="row">
            <input type="email" name="email" placeholder="メールアドレス">
            @if($errors->first('email'))
                <div class="alert alert-danger">{!! nl2br(e($errors->first('email'))) !!}</div>
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
            <p><small>パスワードは8字以上100字以内</small></p>
        </div>
        <div class="row">
            <input type="submit" value="確認画面へ">
            @csrf
        </div>
    </form>
    <div class="row">
    <a data-role="button" type="button" href="/login">ログインはこちら</a>
    </div>
</div>
<script type="text/javascript" src="{{asset('js/passwordToggle.js')}}"></script>
@stop
