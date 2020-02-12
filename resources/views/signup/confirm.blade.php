@extends('layout')

@section('header')
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{asset('css/confirm.css')}}">
    <link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.8.95/css/materialdesignicons.min.css" crossorigin="anonymous">
@endsection

@section('content')
<div class="contentBorder">
    <div class="responsive-table">
        <table  class="table-no-border">
            <tr>
                <td>お名前 : {{$name}}</td>
            </tr>
            <tr>
                <td> パスワード : <input type="password" class="password" value="{{$password}}" readonly>
                    <span class="field-icon">
                        <i toggle="password-field" class="mdi mdi-eye-off toggle-password"></i>
                    </span>
                </td>
            </tr>
            <tr>
                <td> メールアドレス : {{$email}}</td>
            </tr>
            <tr>
                <td>上記の内容でよろしいですか？</td>
            </tr>
        </table>
    </div>
    <div class="row">
        <div class="col-lg-6">
            <form action="/signup/send" method="POST">
                <input type="hidden" name="name" value="{{$name}}">
                <input type="hidden" name="password" value="{{$password}}">
                <input type="hidden" name="email" value="{{$email}}">
                <input type="hidden" name="_token" value="{{csrf_token()}}">
                <input type="submit" value="登録">
            </form>
        </div>
        <div class="col-lg-6">
        <form action="/signup/back" method="GET">
            <input type="submit"value="戻る">
        </form>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{asset('js/passwordToggle.js')}}"></script>
@stop
