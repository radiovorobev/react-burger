import React from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burgers';
import {Route, Routes, useLocation} from 'react-router-dom';
import { HomePage } from '../../pages/HomePage/HomePage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegPage } from '../../pages/RegPage/RegPage';
import { ForgotPwdPage } from '../../pages/ForgotPwdPage/ForgotPwdPage';
import { ResetPwdPage } from '../../pages/ResetPwdPage/ResetPwdPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { FeedPage } from '../../pages/FeedPage/FeedPage';
import { OrdersPage } from '../../pages/OrdersPage/OrdersPage';
import { Page404 } from '../../pages/Page404/Page404';
import { getCookie } from "../../utils/utilities";
import { getUser } from '../../services/actions/auth';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Modal from '../Modal/Modal';
import FeedOrder from '../FeedOrder/FeedOrder';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;

  React.useEffect(() => {
    dispatch(getIngredients())

    if (  getCookie('token')) {
      dispatch(getUser())
    }
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<HomePage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/feed/:id' element ={<FeedOrder />} />
        <Route path='/profile/orders/:id' element={
          <ProtectedRoute>
            <FeedOrder />
          </ProtectedRoute>
        } />
        <Route path='/login' element={
          <ProtectedRoute anonymous={true}>
            <LoginPage />
          </ProtectedRoute>
        } />

          <Route path='/register' exact={true} element={
            <ProtectedRoute anonymous={true}>
            <RegPage />
          </ProtectedRoute> } />

          <Route path='/forgot-password' exact={true} element={
            <ProtectedRoute anonymous={true}>
            <ForgotPwdPage />
            </ProtectedRoute> } />

          <Route path='/reset-password' exact={true} element={
            <ProtectedRoute anonymous={true}>
              <ResetPwdPage />
            </ProtectedRoute> } />

          <Route path='/profile' exact={true} element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute> } />

            <Route path='/profile/orders' exact={true} element={
              <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute> } />

          <Route path='*' element={<Page404 />} />

        </Routes>
      {background && <Routes>

        <Route path='/ingredients/:id' element={
          <Modal>
            <IngredientDetails />
          </Modal>
        } />

        <Route path='/feed/:id' element={
          <Modal>
            <FeedOrder />
          </Modal>
        } />

        <Route path='/profile/orders/:id' element={
          <ProtectedRoute>
            <Modal>
              <FeedOrder />
            </Modal>
          </ProtectedRoute>
        } />

      </Routes>}
    </>
  );
}

export default App;