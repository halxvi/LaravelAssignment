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
            checkFetch: false,
            userID: null,
            date: this.getDateNow(),
            JSON: null,
            token: null,
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
            .then(response => {
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
                console.log("error");
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
                console.log("error");
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
                })
            .catch((e) => {
                console.log("error");
            })
    }

    setDate(arg) {
        this.setState({ date: arg })
    }

    logout() {
        this.setState({ logout: false, checkFetch: false })
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        < Route path='/top' render={() =>
                            this.state.login ?
                                <Top
                                    userID={this.state.userID} JSON={this.state.JSON} date={this.state.date} token={this.state.token}
                                    fetchIndex={() => this.fetchIndex()} setDate={(date) => this.setDate(date)}
                                    logout={() => this.logout()}
                                />
                                : < Redirect to='/login' />
                        } />
                        < Route path='/signup' render={() =>
                            this.state.login ? < Redirect to='/top' /> : <SignUp sendSignUp={(values) => this.sendSignUp(values)} />
                        } />
                        < Route path='/login' render={() =>
                            this.state.login ? < Redirect to='/top' /> : < Login sendAuth={(values) => this.sendAuth(values)} />
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
), document.getElementById('contents')
);
