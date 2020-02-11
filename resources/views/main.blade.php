@extends('layout')

@section('header')
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="{{asset('css/main.css')}}">
@endsection

@section('content')
    <div class="pagenateButton">
        <a href="main/pagenate?parm=previousWeek"><<前週</a>
    </div>
    <div class="pagenateButton">
        <a href="main/pagenate?parm=previousDay"><前日</a>
    </div>
    <div class="pagenateButton">
        <form action="main/pagenate" method="GET" id="inputForm" class="inputForm">
            <input type="date" id="dateInput" name="parm" value={{$dateNow}}>
        </form>
    </div>
    <div class="pagenateButton">
        <a href="main/pagenate?parm=nextDay">翌日></a>
    </div>
    <div class="pagenateButton">
        <a href="main/pagenate?parm=nextWeek">翌週>></a>
    </div>
    <div class="logout">
        <a href="main/logout">ログアウト</a>
    </div>
    <div class="responsive-table">
    <table class="table-hover">
    <caption class="caption">予約可：○　予約済み：×　予約不可：-</caption>
    <thead>
    <th>施設名</th>
    @foreach ($weeks as $week)
    <th>{{$week}}</th>
    @endforeach
    </thead>
    @foreach ($facilities as $key => $facility)
        <tr>
            <td>{{$facility->facilityname}}</td>
            @for($i=0;$i<7;$i++)
            @if($status[$key][$i] == "-")
                <td>{{$status[$key][$i]}}</td>
            @elseif($status[$key][$i] == "×")
                <td><a href="main/delete/?date={{$weekYears[$i]}}&facilityid={{$facility->facilityid}}">{{$status[$key][$i]}}</a></td>
            @else
                <td><a href="main/reserve/?date={{$weekYears[$i]}}&facilityid={{$facility->facilityid}}">{{$status[$key][$i]}}</a></td>
            @endif
            @endfor
        </tr>
    @endforeach
    </table>
    </div>
    <script type="text/javascript" src="{{ asset('main.js') }}"></script>
@stop
