@extends('layout')

@section('content')
<div class="row">
<form action="/signup/confirm" method="POST">
    <input type="text" name="name" placeholder="お名前">
    @if($errors->first('name'))
        <div class="alert alert-danger">{{$errors->first('name')}}</div>
    @endif
    <input type="email" name="email" placeholder="メールアドレス">
    @if($errors->first('email'))
        <div class="alert alert-danger">{{$errors->first('email')}}</div>
    @endif
    <input type="password" name="password" placeholder="パスワード">
    @if($errors->first('password'))
        <div class="alert alert-danger">{{$errors->first('password')}}</div>
    @endif
    <p><small>8字以上100字以内</small></p>
    <input type="submit" value="確認画面へ">
    @csrf
</form>

<a data-role="button" type="button" href="/login">ログインはこちら</a>
</div>
@stop
