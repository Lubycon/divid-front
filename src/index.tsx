import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';
import { RecoilRoot } from 'recoil';
import { Global } from '@emotion/react';

import { reset } from './reset';

import Landing from './pages/landing';
import Login from './pages/login';
import Oauth from './pages/oauth';
import Signin from './pages/signin';

interface RouteProps {
  path: string;
  component: () => JSX.Element;
}

const routes: RouteProps[] = [
  {
    path: '/landing',
    component: Landing
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/oauth',
    component: Oauth
  },
  {
    path: '/signin',
    component: Signin
  }
];

function App() {
  const location = useLocation();

  return (
    <Switch location={location}>
      <Route exact path="/" render={() => <Redirect to="login" />} />
      {routes.map((route) => (
        <Route key={route.path} path={route.path} component={route.component} exact />
      ))}
    </Switch>
  );
}

ReactDOM.render(
  <Router>
    <RecoilRoot>
      <App />
      <Global styles={reset} />
    </RecoilRoot>
  </Router>,
  document.getElementById('root')
);
