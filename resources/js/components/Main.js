import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Top from './Top';
import SignUp from './form/SignUpForm';
import Login from './form/LoginForm';
import NotFound from './404';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            userID: undefined,
            date: this.getDateNow(),
            JSON: undefined,
            token: undefined,
            login_alert: undefined,
            signup_alert: undefined,
        };
    }

    getDateNow() {
        var dt = new Date();
        var y = dt.getFullYear();
        var m = ("00" + (dt.getMonth() + 1)).slice(-2);
        var d = ("00" + dt.getDate()).slice(-2);
        var result = y + "-" + m + "-" + d;
        return result;
    }

    sendAuth(values) {
        axios
            .post("/api/login/auth", { 'email': values["email"], 'password': values["password"] })
            .then(
                response => {
                    var userid = response.data[0][0].userid
                    var token = response.data[1][0].api_token
                    this.setState({
                        login: true,
                        userID: userid,
                        token: token,
                    })
                    this.fetchIndex()
                })
            .catch((e) => {
                if (e.response.status === 422) {
                    this.setState({
                        login_alert: "ログイン情報が間違っています",
                    })
                }
            })
    }

    sendSignUp(values) {
        axios
            .post('/api/signup/send', { 'name': values["name"], 'email': values["email"], 'password': values["password"] })
            .then(
                response => {
                    var userid = response.data[0][0].userid
                    var token = response.data[1][0].api_token
                    this.setState({
                        login: true,
                        userID: userid,
                        token: token,
                    })
                    this.fetchIndex()
                })
            .catch((e) => {
                if (e.response.status === 500) {
                    this.setState({
                        signup_alert: "既にメールアドレスが使われています",
                    })
                }
            })
    }

    fetchIndex() {
        axios
            .post('/api/top', { 'userID': this.state.userID, 'date': this.state.date, 'api_token': this.state.token })
            .then(
                response => {
                    this.setState({
                        JSON: JSON.stringify(response),
                        date: response.data.dateNow
                    })
                    console.log(response)
                })
            .catch((e) => {
                console.log("error");
            })
    }

    setDate(arg) {
        this.setState({ date: arg })
    }

    logout() {
        this.setState({ logout: false })
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        < Route path='/top' render={() =>
                            this.state.login ?
                                < Top
                                    userID={this.state.userID}
                                    JSON={this.state.JSON}
                                    date={this.state.date}
                                    token={this.state.token}
                                    fetchIndex={() => this.fetchIndex()}
                                    setDate={(date) => this.setDate(date)}
                                    logout={() => this.logout()}
                                />
                                : < Redirect to='/login' />
                        } />
                        < Route path='/signup' render={() =>
                            this.state.login ?
                                < Redirect to='/top' />
                                : < SignUp
                                    sendSignUp={(values) => this.sendSignUp(values)}
                                    alert={this.state.signup_alert} />
                        } />
                        < Route path='/login' render={() =>
                            this.state.login ?
                                < Redirect to='/top' />
                                : < Login
                                    sendAuth={(values) => this.sendAuth(values)}
                                    alert={this.state.login_alert} />
                        } />
                        < Route component={NotFound} />
                    </Switch>
                </div>
            </Router >
        );
    }
}

ReactDOM.render((
    <App />
), document.getElementById('app')
);
