@extends('layout')

@section('content')
<form action="/signup/confirm" method="POST">
    <label>お名前</label>
    <input type="text" name="name" >
    <label>メールアドレス</label>
    <input type="email" name="email">
    <label>パスワード</label>
    <input type="password" name="password" >
    <input type="submit" value="登録">
    @csrf
</form>
<a href="/login">ログインはこちら</a>
@stop
