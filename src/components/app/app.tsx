import React, {useEffect, useMemo} from 'react';
import styles from './app.module.css';
import {AppHeader} from '../app-header/app-header';
import {Modal} from '../common/modal/modal';
import {IngredientDetails} from '../burger-ingredients/components/ingredient-details/ingredient-details';
import {OrderDetails} from '../burger-constructor/components/order-details/order-details';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../services/store';
import {Route, Switch, useHistory} from 'react-router-dom';
import {LocationState, Routes} from '../../services/Routes';
import {ProtectedRoute} from '../common/protected-route/protected-route';
import {ForgotPassword, Login, Main, Orders, Page404, Profile, Register, ResetPassword} from '../../pages';
import {fetchIngredientsActionCreator} from '../../services/actions';
import {useLocation} from 'react-router-dom'
import {Loading} from '../loading/loading';


function App() {
    const {
        isOrderSuccess,
        orders,
        needAuthorization,
        isRestoreSuccess,
        isRestoreRequest,
        isForgotRequest,
        isIngredientsRequest,
        isOrderRequest,
        isResetRequest
    } = useSelector((state: RootState) => ({...state}));
    const {state: locationState} = useLocation<LocationState>();
    const history = useHistory();

    const isLoading = useMemo(() => isIngredientsRequest
        || isRestoreRequest
        || isForgotRequest
        || isResetRequest
        || isOrderRequest, [
        isIngredientsRequest, isOrderRequest, isResetRequest, isForgotRequest, isRestoreRequest
    ])

    console.log('isLoading', isLoading)

    const modalIngredient = locationState?.modalIngredient === true;
    const modalOrder = locationState?.modalOrder === true;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIngredientsActionCreator());
    }, [dispatch]);

    /**
     *  redirector
     */
    useEffect(() => {
        if (needAuthorization) {
            history.replace({
                pathname: Routes.login,
                state: {}
            });
            return;
        }

        if (isRestoreSuccess) {
            history.replace({
                pathname: Routes.resetPassword,
                state: {}
            });
            return;
        }

        if (isOrderSuccess && orders && orders.length > 0) {
            const {orderId} = orders[orders.length - 1];
            history.replace({
                pathname: Routes.orderPageLinkCreator(orderId),
                state: {
                    modalOrder: true,
                    backTo: Routes.main
                }
            });
            return;
        }
    }, [history, orders, isOrderSuccess, needAuthorization, isRestoreSuccess]);

    const mainIngredientPath = modalIngredient ? Routes.ingredient : null;
    const mainOrderPath = modalOrder ? Routes.orderPage : null
    const mainPath = mainIngredientPath ?? mainOrderPath ?? Routes.main;

    return (
        <div className={styles.App}>
            <AppHeader/>
            {isLoading
                ? (<Loading/>)
                : (<Switch>
                    <Route path={mainPath} exact={true}><Main/></Route>
                    <Route path={Routes.login} exact={true}><Login/></Route>
                    <Route path={Routes.register} exact={true}><Register/></Route>
                    <Route path={Routes.forgotPassword} exact={true}><ForgotPassword/></Route>
                    <Route path={Routes.resetPassword} exact={true}><ResetPassword/></Route>
                    <ProtectedRoute path={Routes.profile} exact={true}><Profile/></ProtectedRoute>
                    <ProtectedRoute path={Routes.orders} exact={true}><Orders/></ProtectedRoute>
                    {
                        !modalIngredient && (
                            <Route path={Routes.ingredient} exact={true}>
                                <IngredientDetails/>
                            </Route>
                        )
                    }
                    {
                        !modalOrder && (
                            <Route path={Routes.orderPage} exact={true}>
                                <OrderDetails/>
                            </Route>
                        )
                    }
                    <Route><Page404/></Route>
                </Switch>)
            }

            {
                modalIngredient && (
                    <Route path={Routes.ingredient} exact={true}>
                        <Modal title={'Детали ингредиента'}>
                            <IngredientDetails/>
                        </Modal>
                    </Route>
                )
            }
            {
                modalOrder && (
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
