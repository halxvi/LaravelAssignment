@extends('layout')

@section('header')
      <link rel="stylesheet" href="{{asset('css/main.css')}}">
@endsection

@section('content')
<div class="content">
    <div class="buttonLayout">
        <div class="pagenateButton">
            <a href="main/pagenate?parm=previousWeek"><< 前週</a>
        </div>
        <div class="pagenateButton">
            <a href="main/pagenate?parm=previousDay">< 前日</a>
        </div>
        <div class="pagenateButton">
            <form action="main/pagenate" method="GET" id="inputForm" class="inputForm">
                <input type="date" id="dateInput" name="parm" value={{$dateNow}}>
            </form>
        </div>
        <div class="pagenateButton">
            <a href="main/pagenate?parm=nextDay">翌日 ></a>
        </div>
        <div class="pagenateButton">
            <a href="main/pagenate?parm=nextWeek">翌週 >></a>
        </div>
        <div class="logout">
            <a href="main/logout">ログアウト</a>
        </div>
    </div>

    <div class="responsive-table">
        <table class="table-hover">
        <caption class="caption">予約可：○　予約済み：×　予約不可：-</caption>
        <thead>
        <th>施設名</th>
        @foreach ($monthDays as $monthDay)
        <th>{{$monthDay}}</th>
        @endforeach
        </thead>
        @foreach ($facilities as $key => $facility)
            <tr>
                <td>{{$facility->facilityname}}</td>
                @for($i=0;$i<7;$i++)
                @if($status[$key][$i] == "-")
                    <td>{{$status[$key][$i]}}</td>
                @elseif($status[$key][$i] == "×")
                    <td><a href="main/delete/?date={{$yearMonthDays[$i]}}&facilityid={{$facility->facilityid}}">{{$status[$key][$i]}}</a></td>
                @else
                    <td><a href="main/reserve/?date={{$yearMonthDays[$i]}}&facilityid={{$facility->facilityid}}">{{$status[$key][$i]}}</a></td>
                @endif
                @endfor
            </tr>
        @endforeach
        </table>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/main.js') }}"></script>
@stop
