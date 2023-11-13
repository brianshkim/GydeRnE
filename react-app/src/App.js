import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignupForm';
import NavHeader from './components/NavBars/NavHeader';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import Test from './components/test';
import CV from './components/CV';
import { Splash } from './components/Splash';
import SearchBar from './components/search/SearchBar';
import { authenticate } from './store/session';
import Profile from './components/profile/Profile';
import Post from './components/Posts/Post';

import { get_all_users } from './store/user';
import { get_all_posts } from './store/posts';
//import {MathJaxContext} from 'better-react-mathjax'


function App() {
  const user = useSelector(state=>state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(get_all_users());
      await dispatch(get_all_posts());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (

    <BrowserRouter>

      {/* <NavBar /> */}
      <Switch>
        <Route path='/posts/:postId'>
          <NavHeader />
          <Post />
        </Route>
        <Route path='/test'>
          <NavHeader />
          <Test />
        </Route>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <NavHeader />
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <NavHeader />
          <UsersList />
        </ProtectedRoute>
        <Route path='/login' exact={true}>
          <NavHeader />
          <LoginForm />
        </Route>
        {/* <Route path='/profile' exact={true}>
          <NavHeader />
          <Profile />
        </Route> */}
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/*<ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
      </ProtectedRoute>*/}
        <Route path = '*'>
            <Redirect to={`/`} />
          </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;

/*
        <ProtectedRoute path='/users' exact={true} >
          <NavHeader />
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>*/
