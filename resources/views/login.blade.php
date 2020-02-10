@extends('layout')

@section('content')
<form action="login/auth" method="POST">
    <label> メールアドレス</label>
    <input type="email" name="email">
    <label> パスワード</label>
    <input type="password" name="password">
    <label> ログイン状態を維持する</label>
    <input type="checkbox" name="rememberMe" value="1">
    @csrf
<input type="submit" value="ログイン">
</form>
<a href="/signup">アカウント登録はこちら</a>
@stop
