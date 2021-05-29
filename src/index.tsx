import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';
import { RecoilRoot } from 'recoil';

import 'reset-css';
import Header from 'components/header';
import Landing from './pages/landing';
import Login from './pages/login';
import Kakao from './pages/oauth/kakao';
import Create from './pages/create-trip';
import ProjectList from './pages/project-list';
import Trip from './pages/trip';
import Expense from './pages/expense';
import Myinfo from './pages/myinfo';
import Modify from './pages/modify-trip';
import ServiceInfo from './pages/service-info';
import Information from './pages/service-info/information';

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
    path: '/create',
    component: Create
  },
  {
    path: '/projects',
    component: ProjectList
  },
  {
    path: '/trips',
    component: Trip
  },
  {
    path: '/expense',
    component: Expense
  },
  {
    path: '/myinfo',
    component: Myinfo
  },
  {
    path: '/modify',
    component: Modify
  },
  {
    path: '/service',
    component: ServiceInfo
  },
  {
    path: '/privacy',
    component: Information
  },
  {
    path: '/terms',
    component: Information
  }
];

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <Switch location={location}>
        <Route exact path="/" render={() => <Redirect to="login" />} />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} component={route.component} exact />
        ))}
      </Switch>
    </>
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
