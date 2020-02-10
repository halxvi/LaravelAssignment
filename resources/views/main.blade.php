@extends('layout')

@section('content')
    <a>{{$dateNow}}</a>
    <table>
    <th>施設名</th>

    @foreach ($weeks as $week)
        <th>{{$week}}</th>
    @endforeach

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
    <a href="main/logout">ログアウト</a>

@stop
