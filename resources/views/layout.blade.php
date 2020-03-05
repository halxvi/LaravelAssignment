<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.8.95/css/materialdesignicons.min.css" crossorigin="anonymous">
        <link rel="stylesheet" href="{{asset('css/kathamo.css')}}">
        @yield('header')
    </head>
    <body>
        <div class="container">
        @yield('content')
        </div>
    </body>
</html>
