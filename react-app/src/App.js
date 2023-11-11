import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignupForm';
import NavHeader from './components/NavHeader';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Test from './components/test';
import AllPosts from './components/posts/AllPosts';
import CV from './components/CV';
import { Splash } from './components/Splash';
import SearchBar from './components/search/SearchBar';
import { authenticate } from './store/session';
import Profile from './components/Profile';
import Post from './components/posts/AllPosts';
//import {MathJaxContext} from 'better-react-mathjax'


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
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
      <Route path='/post'>
        <NavHeader />
          <Post />
        </Route>
        <Route path='/test'>
        <NavHeader />
          <Test />
        </Route>
        <Route path='/login' exact={true}>
          <NavHeader />
          <LoginForm />
        </Route>
        <Route path='/profile' exact={true}>
          <NavHeader />
          <Profile />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
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
