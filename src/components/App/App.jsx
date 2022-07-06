import React from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/actions';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage/HomePage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegPage } from '../../pages/RegPage/RegPage';
import { ForgotPwdPage } from '../../pages/ForgotPwdPage/ForgotPwdPage';
import { ResetPwdPage } from "../../pages/ResetPwdPage/ResetPwdPage";
import {ProfilePage} from "../../pages/ProfilePage/ProfilePage";
import {Page404} from "../../pages/Page404/Page404";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <>
      <AppHeader />
        <Switch>
          <Route path='/' exact={true}>
            <HomePage />
          </Route>
          <Route path='/login' exact={true}>
            <LoginPage />
          </Route>
          <Route path='/register' exact={true}>
            <RegPage />
          </Route>
          <Route path='/forgot-password' exact={true}>
            <ForgotPwdPage />
          </Route>
          <Route path='/reset-password' exact={true}>
            <ResetPwdPage />
          </Route>
          <Route path='/profile' exact={true}>
            <ProfilePage />
          </Route>
          <Route path='*'>
            <Page404 />
          </Route>
        </Switch>
    </>
  );
}

export default App;