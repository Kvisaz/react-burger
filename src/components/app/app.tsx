import React, { useEffect, useMemo } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { Modal } from '../common/modal/modal';
import { IngredientDetails } from '../burger-ingredients/components/ingredient-details/ingredient-details';
import { OrderDetails } from '../burger-constructor/components/order-details/order-details';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Routes } from '../../services/Routes';
import { ProtectedRoute } from '../common/protected-route/protected-route';
import {
  ForgotPassword,
  Login,
  Main,
  OrderFeedDetails,
  OrderFeedPage,
  Page404,
  Profile,
  Register,
  ResetPassword,
} from '../../pages';
import { IBurgerActionType, initData, logoutActionCreator, setModalUrlOn } from '../../services/actions';
import { Loading } from '../loading/loading';
import { ProtectedAuthRoute } from '../common/protected-auth-route/protected-auth-route';
import { useMainState } from '../../services/hooks/useMainState';


function App() {
  const {
    isRestoreRequest,
    isIngredientsRequest,
    isResetRequest,
    isRegisterRequest,
    isLoginRequest,
    isModalUrl,
    isAuthorizationChecking,
    isOrderFailed,
    showCreatedOrder,
  } = useMainState();
  const history = useHistory();
  const location = useLocation();

  const isLoading = useMemo(() => isIngredientsRequest
    || isRestoreRequest
    || isResetRequest
    || isRegisterRequest
    || isLoginRequest
    || isAuthorizationChecking
    , [
      isAuthorizationChecking,
      isIngredientsRequest, isResetRequest,
      isRestoreRequest, isRegisterRequest,
      isLoginRequest,
    ]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initData());
  }, [dispatch]);

  /**
   *  redirector
   */
  useEffect(() => {
    if (showCreatedOrder) {
      dispatch(setModalUrlOn());
      dispatch({ type: IBurgerActionType.ORDERED_POPUP_SHOW, order: showCreatedOrder });
      history.replace({
        pathname: Routes.orderPageLinkCreator(showCreatedOrder.id),
      });
      return;
    }
  }, [dispatch, history, showCreatedOrder]);

  useEffect(() => {
    if (isOrderFailed) {
      dispatch(logoutActionCreator());
    }
  }, [dispatch, isOrderFailed]);

  return (
    <div className={styles.App}>
      <AppHeader />
      {isLoading
        ? (<Loading />)
        : (<Switch>
          <Route path={isModalUrl ? location.pathname : Routes.main} exact={true}><Main /></Route>
          <ProtectedAuthRoute path={Routes.login} exact={true}><Login /></ProtectedAuthRoute>
          <ProtectedAuthRoute path={Routes.register} exact={true}><Register /></ProtectedAuthRoute>
          <ProtectedAuthRoute path={Routes.forgotPassword} exact={true}><ForgotPassword /></ProtectedAuthRoute>
          <Route path={Routes.resetPassword} exact={true}><ResetPassword /></Route>
          <Route path={Routes.orderFeed} exact={true}><OrderFeedPage /></Route>
          <Route path={Routes.orderFeedDetails} exact={true}><OrderFeedDetails /></Route>
          <ProtectedRoute path={Routes.profileOrdersDetails} exact={true}><OrderFeedDetails /></ProtectedRoute>
          <ProtectedRoute path={Routes.profile}><Profile /></ProtectedRoute>
          <Route path={Routes.ingredient} exact={true}>
            <IngredientDetails />
          </Route>
          <Route path={Routes.orderPage} exact={true}>
            <OrderDetails />
          </Route>
          <Route><Page404 /></Route>
        </Switch>)
      }

      {
        isModalUrl && (
          <Route path={Routes.ingredient} exact={true}>
            <Modal title={'Детали ингредиента'}>
              <IngredientDetails />
            </Modal>
          </Route>
        )
      }
      {
        isModalUrl && (
          <Route path={Routes.orderPage} exact={true}>
            <Modal>
              <OrderDetails />
            </Modal>
          </Route>
        )
      }
    </div>
  );
}

export default App;
