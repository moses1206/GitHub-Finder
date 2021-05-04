import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import UserProfile from "./components/users/UserProfile";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };

  // Search Github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  // Get single Github user
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: res.data, loading: false });
  };

  // Clear User
  clearUser = () => {
    this.setState({ users: [], loading: false });
  };

  // Alert
  onAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 2500);
  };

  render() {
    const { users, user, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUser={this.clearUser}
                      showClear={users.length > 0 ? true : false}
                      onAlert={this.onAlert}
                    />
                    <User loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <UserProfile
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
