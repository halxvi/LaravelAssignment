import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import axios from 'axios'
import Top from './Top'
import SignUp from './form/SignupForm'
import Login from './form/LoginForm'
import NotFound from './404'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      userId: '',
      date: '',
      json: '',
      api_token: '',
      login_alert: '',
      signup_alert: '',
    }
  }

  componentDidMount() {
    this.setState({ date: this.calculateDateNow() })
  }

  calculateDateNow() {
    let date = new Date()
    let y = date.getFullYear()
    let m = ('00' + (date.getMonth() + 1)).slice(-2)
    let d = ('00' + date.getDate()).slice(-2)
    let result = y + '-' + m + '-' + d
    return result
  }

  sendAuth(values) {
    axios
      .post('/api/login/auth', {
        email: values['email'],
        password: values['password'],
      })
      .then((response) => {
        let userId = response.data[0][0].userid
        let api_token = response.data[1][0].api_token
        this.setState({
          isLogin: true,
          userId,
          api_token,
        })
        this.fetchIndex()
      })
      .catch((e) => {
        if (e.response.status === 422) {
          this.setState({
            login_alert: 'ログイン情報が間違っています',
          })
        }
      })
  }

  sendSignUp(values) {
    axios
      .post('/api/signup/send', {
        name: values['name'],
        email: values['email'],
        password: values['password'],
      })
      .then((response) => {
        let userId = response.data[0][0].userid
        let api_token = response.data[1][0].api_token
        this.setState({
          isLogin: true,
          userId,
          api_token,
        })
        this.fetchIndex()
      })
      .catch((e) => {
        if (e.response.status === 500) {
          this.setState({
            signup_alert: '既にメールアドレスが使われています',
          })
        }
      })
  }

  fetchIndex() {
    const { state } = this
    const { date, api_token, userId } = state
    axios
      .post('/api/top', {
        userId,
        date,
        api_token,
      })
      .then((response) => {
        this.setState({
          json: JSON.stringify(response),
          date: response.data.dateNow,
        })
      })
      .catch(() => {
        console.log('error')
      })
  }

  setDate(date) {
    this.setState({ date })
  }

  logout() {
    this.setState({ isLogin: false })
  }

  render() {
    const { state } = this
    const {
      isLogin,
      json,
      date,
      api_token,
      userId,
      signup_alert,
      login_alert,
    } = state

    return (
      <Router>
        <Switch>
          <Route
            path="/top"
            render={() =>
              isLogin ? (
                <Top
                  userID={userId}
                  nonParsedJson={json}
                  date={date}
                  api_token={api_token}
                  fetchIndex={() => this.fetchIndex()}
                  setDate={(date) => this.setDate(date)}
                  logout={() => this.logout()}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/signup"
            render={() =>
              isLogin ? (
                <Redirect to="/top" />
              ) : (
                <SignUp
                  sendSignUp={(values) => this.sendSignUp(values)}
                  alert={signup_alert}
                />
              )
            }
          />
          <Route
            path="/login"
            render={() =>
              isLogin ? (
                <Redirect to="/top" />
              ) : (
                <Login
                  sendAuth={(values) => this.sendAuth(values)}
                  alert={login_alert}
                />
              )
            }
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('app'))
