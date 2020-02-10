@extends('layout')

@section('content')
<tr>
<td>お名前 : {{$name}}</td>
<td> パスワード : {{$password}}</td>
<td> メールアドレス : {{$email}}</td>
<td>上記の内容でよろしいですか？</td>
</tr>
<form action="/signup/send" method="POST">
    <input type="hidden" name="name" value="{{$name}}">
    <input type="hidden" name="password" value="{{$password}}">
    <input type="hidden" name="email" value="{{$email}}">
    <input type="hidden" name="_token" value="{{csrf_token()}}">
    <input type="submit" value="登録!">
</form>

@stop
