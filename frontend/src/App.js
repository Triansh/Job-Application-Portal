import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Snackbar from './components/Controls/SnackBar';
import SignUp from './components/RegisterLogin/SignUp';
import Login from './components/RegisterLogin/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/RegisterLogin/Profile';
import MyApplications from './components/Pages/My Applications/MyApplications';
import MyEmployees from './components/Pages/My Employees/MyEmployees';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Dashboard} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/applications" exact component={MyApplications} />
        <Route path="/employees" exact component={MyEmployees} />
      </Switch>
      <Snackbar />
    </>
  );
};

export default App;
