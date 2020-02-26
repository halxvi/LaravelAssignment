import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Top from './Top';
import SignUp from './SignUpForm';
import Login from './LoginForm';
import NotFound from './404';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 1,
            date: 'none',
            JSON: null,
            token: 'NFvufgHBuu8BrDAKCzm3H9FdQoPbt4RZqH6VRtgpSzjwBgLssQ3Hcy6Yn4h6lhUSI6nb8pwJCGIJIy0Q',
        };
    }

    fetchIndex() {
        axios
            .get(`/api/top?userID=${this.state.userID}&date=${this.state.date}&api_token=${this.state.token}`)
            .then(response => {
                this.setState({ JSON: JSON.stringify(response) })
                this.setState({
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

    componentDidMount() {
        this.fetchIndex();
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        < Route path='/top' render={
                            () => <Top
                                userID={this.state.userID} JSON={this.state.JSON} date={this.state.date} Token={this.state.token}
                                fetchIndex={() => this.fetchIndex()} setDate={(date) => this.setDate(date)}
                                changeDate={(e) => this.setDate(e.target.value)}
                            />
                        } />
                        < Route path='/signup' component={SignUp} />
                        < Route path='/login' component={Login} />
                        < Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

ReactDOM.render((
    <App />
), document.getElementById('contents')
);
