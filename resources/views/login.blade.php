@extends('layout')

@section('content')
<form action="login/confirm" method="POST">
    <label> パスワード</label>
    <input type="password">
    <label> メールアドレス</label>
    <input type="email">
    @csrf
<input type="submit" value="ログイン">
</form>
@stop
