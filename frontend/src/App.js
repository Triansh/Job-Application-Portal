import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Snackbar from './components/common/SnackBar';
import SignUp from './components/RegisterLogin/SignUp';
import Login from './components/RegisterLogin/Login';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Dashboard} />
      </Switch>
      <Snackbar />
    </>
  );
};

export default App;
