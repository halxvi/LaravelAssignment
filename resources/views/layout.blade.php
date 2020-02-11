<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @yield('header')
        <link rel="stylesheet" href="{{asset('css/kathamo.css')}}">
    </head>
    <body>
        <div class="flexbox">
        <div class="container">
        @yield('content')
        </div>
        </div>
    </body>
</html>
