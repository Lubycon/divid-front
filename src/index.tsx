import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';
import { RecoilRoot } from 'recoil';

import Landing from './pages/landing';
import Login from './pages/login';

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
  }
];

function App() {
  const location = useLocation();

  return (
    <Switch location={location}>
      <Route exact path="/" render={() => <Redirect to="landing" />} />
      {routes.map((route, i) => (
        <Route key={i} path={route.path} component={route.component} exact />
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
