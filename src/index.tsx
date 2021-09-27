import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';
import { isHomePage } from 'utils';
import 'reset-css';
import Header from 'components/header';
import Error404 from 'pages/error/404';
import LandingHeader from 'pages/landing/header';
import Landing from './pages/landing';
import Login from './pages/login';
import Create from './pages/create-trip';
import ProjectList from './pages/project-list';
import Trip from './pages/trip';
import Expense from './pages/expense';
import EditExpense from './pages/expense/edit';
import MyPage from './pages/mypage';
import Kakao from './pages/oauth/kakao';
import Modify from './pages/modify-trip';
import ServiceInfo from './pages/service-info';
import Join from './pages/join';

interface RouteProps {
  path: string;
  component: () => JSX.Element;
}

const routes: RouteProps[] = [
  {
    path: '/home',
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
    path: '/editExpense',
    component: EditExpense
  },
  {
    path: '/mypage',
    component: MyPage
  },
  {
    path: '/modify',
    component: Modify
  },
  {
    path: '/privacy',
    component: ServiceInfo
  },
  {
    path: '/terms',
    component: ServiceInfo
  },
  {
    path: '/notFound',
    component: Error404
  },
  {
    path: '/join',
    component: Join
  }
];

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      {isHomePage() ? <LandingHeader /> : <Header />}
      <Switch location={location}>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} component={route.component} exact />
        ))}
        <Route component={Error404} />
      </Switch>
    </QueryClientProvider>
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
