import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

function Top(props) {
  const { nonParsedJson, date, api_token, logout, userID } = props
  let JsonObj
  if (nonParsedJson) {
    JsonObj = JSON.parse(nonParsedJson)
    var { monthDays, yearMonthDays, facilities, status } = JsonObj.data
  }

  return (
    <div className="content">
      <div className="buttonLayout">
        <div className="buttonLayout__pagenateButton">
          <a onClick={() => pagenate(props, 'previousWeek', date, api_token)}>
            前週
          </a>
        </div>
        <div className="buttonLayout__pagenateButton">
          <a onClick={() => pagenate(props, 'previousDay', date, api_token)}>
            前日
          </a>
        </div>
        <div className="buttonLayout__pagenateButton">
          <input
            type="date"
            id="dateInput"
            name="parm"
            value={date}
            onChange={(e) => {
              pagenate(props, 'userChangeInput', e.target.value, api_token)
            }}
          ></input>
        </div>
        <div className="buttonLayout__pagenateButton">
          <a onClick={() => pagenate(props, 'nextDay', date, api_token)}>
            翌日
          </a>
        </div>
        <div className="buttonLayout__pagenateButton">
          <a onClick={() => pagenate(props, 'nextWeek', date, api_token)}>
            翌週
          </a>
        </div>
        <div className="buttonLayout__logout">
          <a href="/login" onClick={() => logout()}>
            ログアウト
          </a>
        </div>
      </div>
      {JsonObj && (
        <div className="responsive-table">
          <table className="table">
            <caption className="table__caption">
              予約可：○ 予約済み：× 予約不可：-
            </caption>
            <thead>
              <tr>
                <th>施設名</th>
                {monthDays.map((monthDay) => (
                  <th key={monthDay.toString()} className="table__th--center">
                    {monthDay}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility, index) => (
                <tr key={index.toString()}>
                  <th>{facility.facilityname}</th>
                  {status[index].map((mark, key) =>
                    checkStatus(
                      props,
                      mark,
                      yearMonthDays[key],
                      facility.facilityid,
                      userID,
                      api_token,
                      key
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function checkStatus(props, mark, date, facilityID, userID, api_token, key) {
  if (mark === '-') {
    return (
      <td key={key.toString()} className="table__td">
        {mark}
      </td>
    )
  } else if (mark === '×') {
    return (
      <td key={key.toString()} className="table__td">
        <a
          className="table__a--xlarge"
          onClick={() => deleteReservation(props, date, facilityID, api_token)}
        >
          {mark}
        </a>
      </td>
    )
  } else {
    return (
      <td key={key.toString()} className="table__td">
        <a
          className="table__a--xlarge"
          onClick={() =>
            addReservation(props, date, facilityID, userID, api_token)
          }
        >
          {mark}
        </a>
      </td>
    )
  }
}

function addReservation(props, date, facilityid, userID, api_token) {
  const { fetchIndex } = props
  axios
    .post('api/top/reserve', {
      date: date,
      facilityid: facilityid,
      userID: userID,
      api_token: api_token,
    })
    .then(() => {
      fetchIndex()
    })
    .catch(() => {
      console.log('Something Bad happend')
    })
}

function deleteReservation(props, date, facilityid, api_token) {
  const { fetchIndex } = props
  axios
    .post('api/top/delete', {
      date: date,
      facilityid: facilityid,
      api_token: api_token,
    })
    .then(() => {
      fetchIndex()
    })
    .catch(() => {
      console.log('Something Bad happend')
    })
}

function pagenate(props, mode, date, api_token) {
  const { setDate, fetchIndex } = props
  axios
    .post('api/top/pagenate', {
      mode: mode,
      date: date,
      api_token: api_token,
    })
    .then((response) => {
      setDate(response.data)
      fetchIndex()
    })
    .catch(() => {
      console.log('Something Bad happend')
    })
}

Top.propTypes = {
  nonParsedJson: PropTypes.string,
  date: PropTypes.string,
  api_token: PropTypes.string,
  logout: PropTypes.func,
  userID: PropTypes.string,
}

export default Top
