import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';
import { RecoilRoot } from 'recoil';

import 'reset-css';
import Landing from './pages/landing';
import Login from './pages/login';
import Kakao from './pages/oauth/kakao';
import Signin from './pages/signin';
import Create from './pages/create';
import ProjectList from './pages/project-list';
import Trip from './pages/trip';

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
    path: '/oauth/kakao/result',
    component: Kakao
  },
  {
    path: '/signin',
    component: Signin
  },
  {
    path: '/create',
    component: Create
  },
  {
    path: '/projects',
    component: ProjectList
  },
  {
    path: '/projects/trip/:tripSeq',
    component: Trip
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
    </RecoilRoot>
  </Router>,
  document.getElementById('root')
);
