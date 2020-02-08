@extends('layout')

@section('content')
<form action="/signup/create" method="GET">
    <label>お名前</label>
    <input type="text" name="name" >
    <label> パスワード</label>
    <input type="password" name="password" >
    <label> メールアドレス</label>
    <input type="email" name="email">
    <input type="submit" value="登録">
    @csrf
</form>

@stop
