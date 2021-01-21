import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import SignUp from './components/RegisterLogin/SignUp';
import Login from './components/RegisterLogin/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/RegisterLogin/Profile';
import MyApplications from './components/Pages/My Applications/MyApplications';
import MyEmployees from './components/Pages/My Employees/MyEmployees';
import JobApplications from './components/Pages/JobApplications/JobApplications';

import Snackbar from './components/Controls/SnackBar';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/" exact component={Dashboard} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute person="Applicant" path="/applications" exact component={MyApplications} />
        <PrivateRoute person="Recruiter" path="/employees" exact component={MyEmployees} />
        <PrivateRoute person="Recruiter" path="/jobs/:id" exact component={JobApplications} />
      </Switch>
      <Snackbar />
    </>
  );
};

export default App;
