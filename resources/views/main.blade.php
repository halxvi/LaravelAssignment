@extends('layout')

@section('header')
  <link rel="stylesheet" href="{{asset('css/main.css')}}">
  <script>
    let api_token = '<?php echo $api_token[0]; ?>';
  </script>
@endsection

@section('content')
  <div id="main"></div>

  //応急処置
  <input type='hidden' value={{ $api_token[0] }}>

  <script src="{{mix('js/app.js')}}"></script>
  <script type="text/javascript" src="{{ asset('js/main.js') }}"></script>
@stop
