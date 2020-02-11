@extends('layout')

@section('header')
<link rel="stylesheet" href="{{asset('css/login.css')}}">
@endsection

@section('content')
<div class="contentBorder">
    <form action="login/auth" method="POST" class="form">
        <div class="flexItem">
            <input type="email" name="email" placeholder="メールアドレス" value="{{old('email')}}">
            @if($errors->first('email'))
                <div class="alert alert-danger">{{$errors->first('email')}}</div>
            @endif
        </div>
        <div class="flexItem">
            <input type="password" name="password" placeholder="パスワード">
            @if($errors->first('password'))
                <div class="alert alert-danger">{{$errors->first('password')}}</div>
            @endif
            <div class="flexItem">
            <label>ログイン状態を維持する
            <input type="checkbox" name="rememberMe" value="1">
            </label>
            </div>
            @csrf
            <input type="submit" value="ログイン">
        </div>
    </form>
    <a data-role="button" type="button" href="/signup">アカウント登録はこちら</a>
</div>
@stop
