import React from 'react';
import axios from 'axios';


function Top(props) {
    let json = JSON.parse(props.JSON);
    return (
        < div className="content" >
            <div className="buttonLayout">
                <div className="pagenateButton">
                    <a onClick={e => pagenate("previousWeek", props.date, props.Token, props)}>前週</a>
                </div>
                <div className="pagenateButton">
                    <a onClick={e => pagenate("previousDay", props.date, props.Token, props)}>前日</a>
                </div>
                <div className="pagenateButton">
                    <input type="date" id="dateInput" name="parm" value={props.date} onChange={props.changeDate}></input>
                </div>
                <div className="pagenateButton">
                    <a onClick={e => pagenate("nextDay", props.date, props.Token, props)}>翌日</a>
                </div>
                <div className="pagenateButton">
                    <a onClick={e => pagenate("nextWeek", props.date, props.Token, props)}>翌週</a>
                </div>
                <div className="logout">
                    <a to="top/logout">ログアウト</a>
                </div>
            </div>
            {
                json &&
                <div className="responsive-table">
                    <table className="table-hover">

                        <caption className="caption">予約可：○　予約済み：×　予約不可：-</caption>
                        <thead>
                            <tr>
                                <th>施設名</th>
                                {json.data.monthDays.map((monthDay) =>
                                    <th key={monthDay.toString()}>{monthDay}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {json.data.facilities.map((facility, index) =>
                                <tr key={index.toString()}>
                                    <th>{facility.facilityname}</th>
                                    {
                                        json.data.status[index].map((mark, key) =>
                                            checkStatus(mark, json.data.yearMonthDays[key], facility.facilityid, props.userID, props.Token, key, props)
                                        )
                                    }
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div >
            }
        </div >
    );
}

function checkStatus(mark, date, facilityID, userID, token, key, props) {
    if (mark === "-") {
        return <td key={key.toString()}>{mark}</td>;
    }
    else if (mark === "×") {
        return <td key={key.toString()}><a onClick={e => deleteReservation(date, facilityID, token, props)}>{mark}</a></td>
    }
    else {
        return <td key={key.toString()}><a onClick={e => addReservation(date, facilityID, userID, token, props)}>{mark}</a></td>
    }
}

function deleteReservation(date, facilityid, token, props) {
    axios
        .get(`api/top/delete?date=${date}&facilityid=${facilityid}&api_token=${token}`)
        .then(props.fetchIndex)
        .catch((e) => {
            console.log("error");
        })
}

function addReservation(date, facilityid, userID, token, props) {
    axios
        .get(`api/top/reserve?date=${date}&facilityid=${facilityid}&userID=${userID}&api_token=${token}`)
        .then(props.fetchIndex)
        .catch((e) => {
            console.log("error");
        })
}

function pagenate(mode, date, token, props) {
    axios
        .get(`api/top/pagenate?parm=${mode}&date=${date}&api_token=${token}`)
        .then((response) => {
            props.setDate(response.data.date);
            props.fetchIndex;
            console.log(response.data.date)
        })
        .catch((e) => {
            console.log("error");
        })
}

export default Top;

