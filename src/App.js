import React, { useState , Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";

import GithubState from './context/github/GithubState';
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // async componentDidMount() {
  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
  //    this.setState({loading: true});
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  //   client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   console.log(res.data);
  //   this.setState({users: res.data,loading: false});
  // }
 const searchUsersHandler = async (text) => {
    console.log(text);
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}
    console.log(res.data);
    setUsers(res.data.items);
    setLoading(false);
  };

  const clearUsersHandler = () => {
    setUsers([]);
    setLoading(false);
  };

  // get a Single User
  const getUser = async (username) => {
    console.log(username);
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log("HELLLO",res.data);
    setLoading(false);
    setUser(res.data);
  };

  const getUserRepos = async (username) => {
    console.log(username);
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log("HELLLO",res.data);
    setLoading(false);
    setRepos(res.data);
  };
  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null),  3000);
  };

  return (
    <GithubState> 
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsersHandler}
                      clearUsers={clearUsersHandler}
                      showClear={users.length > 0}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              {/* <Route exact path='user/:login' 
              render = {props => (
                <User {...props } getUser={this.getUserHandler} user={user}  loading = { loading } />
              )} />  */}
              <Route exact path='/user/:login' render={props => (
                <User 
                  {...props} 
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user} 
                  repos= {repos}
                  loading={loading} 
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
      </GithubState>
    );

}
export default App;
