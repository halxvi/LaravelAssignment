@extends('layout')

@section('header')
    <link rel="stylesheet" href="{{asset('css/login.css')}}">
    <link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.8.95/css/materialdesignicons.min.css" crossorigin="anonymous">
    <script>
        let csrf_token = '<?php echo csrf_token(); ?>';
    </script>
@endsection

@section('content')
    <div id="loginForm"></div>
    <script src="{{mix('js/app.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/passwordToggle.js')}}"></script>
@stop
