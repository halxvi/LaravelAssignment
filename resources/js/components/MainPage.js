import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facilities: null,
            monthDays: null,
        }
    }

    render() {
        return (
            < div className="content" >
                <div className="buttonLayout">
                    <div className="pagenateButton">
                        <a href="main/pagenate?parm=previousWeek">前週</a>
                    </div>
                    <div className="pagenateButton">
                        <a href="main/pagenate?parm=previousDay">前日</a>
                    </div>
                    <div className="pagenateButton">
                        <form action="main/pagenate" method="GET" id="inputForm" className="inputForm">
                            {/* <input type="date" id="dateInput" name="parm" value={{ $dateNow }}></input> */}
                        </form>
                    </div>
                    <div className="pagenateButton">
                        <a href="main/pagenate?parm=nextDay">翌日</a>
                    </div>
                    <div className="pagenateButton">
                        <a href="main/pagenate?parm=nextWeek">翌週</a>
                    </div>
                    <div className="logout">
                        <a href="main/logout">ログアウト</a>
                    </div>
                </div>

                {/* <div className="responsive-table">
                    <table className="table-hover">
                        <caption className="caption">予約可：○　予約済み：×　予約不可：-</caption>
                        <thead>
                            <th>施設名</th>
                            @foreach ($monthDays as $monthDay)
<th>{{ $monthDay }}</th>
                            @endforeach
</thead>
                        @foreach ($facilities as $key => $facility)
<tr>
                            <td>{{ $facility-> facilityname}}</td>
                            @for($i=0;$i<7;$i++)
                            @if($status[$key][$i] == "-")
        <td>{{ $status[$key][$i] }}</td>
                            @elseif($status[$key][$i] == "×")
        <td><a href="main/delete/?date={{$yearMonthDays[$i]}}&facilityid={{$facility->facilityid}}">{{ $status[$key][$i] }}</a></td>
                            @else
        <td><a href="main/reserve/?date={{$yearMonthDays[$i]}}&facilityid={{$facility->facilityid}}">{{ $status[$key][$i] }}</a></td>
                            @endif
                            @endfor
</tr>
                        @endforeach
                        <thead>
                            <th>施設名</th>
                            {this.state.json.monthDays.map((monthDay) => {
                                <th>monthDay</th>
                            })};
                        </thead>
                    </table>
                </div> */}
            </div >
        );
    }
}

function getJson() {
    var json = JSON.parse(api_token);
    $.ajax({
        url: 'api/info?api_token=' + json.api_token,
        dataType: 'json',
        success: function (data) {
            return;
        }
    });
}

if (document.getElementById('main')) {
    ReactDOM.render(<MainPage />, document.getElementById('main'));
}
