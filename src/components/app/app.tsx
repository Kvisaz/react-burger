import React, {useEffect, useMemo} from 'react';
import styles from './app.module.css';
import {AppHeader} from '../app-header/app-header';
import {Modal} from '../common/modal/modal';
import {IngredientDetails} from '../burger-ingredients/components/ingredient-details/ingredient-details';
import {OrderDetails} from '../burger-constructor/components/order-details/order-details';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../services/store';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {Routes} from '../../services/Routes';
import {ProtectedRoute} from '../common/protected-route/protected-route';
import {ForgotPassword, Login, Main, Orders, Page404, Profile, Register, ResetPassword} from '../../pages';
import {fetchIngredientsActionCreator, logoutActionCreator, setModalUrlOn} from '../../services/actions';
import {Loading} from '../loading/loading';
import {ProtectedAuthRoute} from '../common/protected-auth-route/protected-auth-route';


function App() {
    const {
        isOrderSuccess,
        orders,
        isRestoreRequest,
        isForgotRequest,
        isIngredientsRequest,
        isOrderRequest,
        isResetRequest,
        isRegisterRequest,
        isRegisterFailed,
        isLoginRequest,
        isModalUrl,
        isAuthorizationChecking,
        isOrderFailed
    } = useSelector((state: RootState) => ({...state}));
    const history = useHistory();
    const location = useLocation();

    const isLoading = useMemo(() => isIngredientsRequest
        || isRestoreRequest
        || isForgotRequest
        || isResetRequest
        || isOrderRequest
        || isRegisterRequest
        || isLoginRequest
        || isAuthorizationChecking
        , [
            isAuthorizationChecking,
            isIngredientsRequest, isOrderRequest, isResetRequest,
            isForgotRequest, isRestoreRequest, isRegisterRequest,
            isLoginRequest,
        ]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIngredientsActionCreator());
    }, [dispatch]);

    /**
     *  redirector
     */
    useEffect(() => {
        if (isOrderSuccess && orders && orders.length > 0) {
            const {orderId} = orders[orders.length - 1];
            dispatch(setModalUrlOn());
            history.replace({
                pathname: Routes.orderPageLinkCreator(orderId),
            });
            return;
        }
    }, [dispatch, history, orders, isOrderSuccess, isRegisterFailed,
    ]);

    useEffect(() => {
        if (isOrderFailed) {
            dispatch(logoutActionCreator())
        }
    }, [dispatch, isOrderFailed])

    return (
        <div className={styles.App}>
            <AppHeader/>
            {isLoading
                ? (<Loading/>)
                : (<Switch>
                    <Route path={isModalUrl ? location.pathname : Routes.main} exact={true}><Main/></Route>
                    <ProtectedAuthRoute path={Routes.login} exact={true}><Login/></ProtectedAuthRoute>
                    <ProtectedAuthRoute path={Routes.register} exact={true}><Register/></ProtectedAuthRoute>
                    <ProtectedAuthRoute path={Routes.forgotPassword} exact={true}><ForgotPassword/></ProtectedAuthRoute>
                    <Route path={Routes.resetPassword} exact={true}><ResetPassword/></Route>
                    <ProtectedRoute path={Routes.profile} exact={true}><Profile/></ProtectedRoute>
                    <ProtectedRoute path={Routes.orders} exact={true}><Orders/></ProtectedRoute>
                    <Route path={Routes.ingredient} exact={true}>
                        <IngredientDetails/>
                    </Route>
                    <Route path={Routes.orderPage} exact={true}>
                        <OrderDetails/>
                    </Route>
                    <Route><Page404/></Route>
                </Switch>)
            }

            {
                isModalUrl && (
                    <Route path={Routes.ingredient} exact={true}>
                        <Modal title={'Детали ингредиента'}>
                            <IngredientDetails/>
                        </Modal>
                    </Route>
                )
            }
            {
                isModalUrl && (
                    <Route path={Routes.orderPage} exact={true}>
                        <Modal>
                            <OrderDetails/>
                        </Modal>
                    </Route>
                )
            }
        </div>
    );
}

export default App;
