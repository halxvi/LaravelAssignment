import React from 'react';
import axios from 'axios';

function Top(props) {
    if (props.JSON) {
        var json = JSON.parse(props.JSON);
    }
    return (
        < div className="content" >
            <div className="buttonLayout">
                <div className="buttonLayout__pagenateButton">
                    <a onClick={e => pagenate(props, "previousWeek", props.date, props.token)}>前週</a>
                </div>
                <div className="buttonLayout__pagenateButton">
                    <a onClick={e => pagenate(props, "previousDay", props.date, props.token)}>前日</a>
                </div>
                <div className="buttonLayout__pagenateButton">
                    <input type="date" id="dateInput" name="parm" value={props.date} onChange={(e) => {
                        pagenate(props, "userChangeInput", e.target.value, props.token)
                    }
                    }></input>
                </div>
                <div className="buttonLayout__pagenateButton">
                    <a onClick={e => pagenate(props, "nextDay", props.date, props.token)}>翌日</a>
                </div>
                <div className="buttonLayout__pagenateButton">
                    <a onClick={e => pagenate(props, "nextWeek", props.date, props.token)}>翌週</a>
                </div>
                <div className="buttonLayout__logout">
                    <a href="/login" onClick={e => props.logout()}>ログアウト</a>
                </div>
            </div>
            {
                json &&
                <div className="responsive-table">
                    <table className="table">
                        <caption className="table__caption">予約可：○　予約済み：×　予約不可：-</caption>
                        <thead>
                            <tr>
                                <th>施設名</th>
                                {json.data.monthDays.map((monthDay) =>
                                    <th key={monthDay.toString()} className="table__th--center">{monthDay}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {json.data.facilities.map((facility, index) =>
                                <tr key={index.toString()}>
                                    <th>{facility.facilityname}</th>
                                    {
                                        json.data.status[index].map((mark, key) =>
                                            checkStatus(props, mark, json.data.yearMonthDays[key], facility.facilityid, props.userID, props.token, key)
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


function checkStatus(props, mark, date, facilityID, userID, token, key) {
    if (mark === "-") {
        return <td key={key.toString()} className="table__td">{mark}</td>;
    }
    else if (mark === "×") {
        return <td key={key.toString()} className="table__td"><a className="table__a--xlarge" onClick={e => deleteReservation(props, date, facilityID, token)}>{mark}</a></td>
    }
    else {
        return <td key={key.toString()} className="table__td"><a className="table__a--xlarge" onClick={e => addReservation(props, date, facilityID, userID, token)}>{mark}</a></td>
    }
}

function addReservation(props, date, facilityid, userID, token) {
    axios
        .post('api/top/reserve',
            { 'date': date, 'facilityid': facilityid, 'userID': userID, 'api_token': token })
        .then(
            () => {
                props.fetchIndex()
            }
        )
        .catch((e) => {
            console.log("Something Bad happend");
        })
}

function deleteReservation(props, date, facilityid, token) {
    axios
        .post('api/top/delete',
            { 'date': date, 'facilityid': facilityid, 'api_token': token })
        .then(
            () => {
                props.fetchIndex()
            }
        )
        .catch((e) => {
            console.log("Something Bad happend");
        })
}

function pagenate(props, mode, date, token) {
    axios
        .post('api/top/pagenate',
            { 'mode': mode, 'date': date, 'api_token': token })
        .then((response) => {
            props.setDate(response.data);
            props.fetchIndex()
        })
        .catch((e) => {
            console.log("Something Bad happend");
        })
}

export default Top;

