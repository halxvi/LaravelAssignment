@extends('layout')

@section('content')
<div class="responsive-table">
    <table  class="table-no-border">
    <tr>
    <td>お名前 : {{$name}}</td>
    </tr>
    <tr>
    <td> パスワード : {{$password}}</td>
    </tr>
    <tr>
    <td> メールアドレス : {{$email}}</td>
    </tr>
    <tr>
    <td>上記の内容でよろしいですか？</td>
    </tr>
    </table>
</div>
<form action="/signup/send" method="POST">
    <input type="hidden" name="name" value="{{$name}}">
    <input type="hidden" name="password" value="{{$password}}">
    <input type="hidden" name="email" value="{{$email}}">
    <input type="hidden" name="_token" value="{{csrf_token()}}">
    <input type="submit" value="登録">
</form>
<form action="/signup/back" method="GET">
    <input type="submit"value="戻る">
</form>
@stop
