import React, {useEffect} from 'react';
import styles from './app.module.css';
import {AppHeader} from '../app-header/app-header';
import {Modal} from '../common/modal/modal';
import {IngredientDetails} from '../burger-ingredients/components/ingredient-details/ingredient-details';
import {OrderDetails} from '../burger-constructor/components/order-details/order-details';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../services/store';
import {Route, Switch} from 'react-router-dom';
import {LocationState, Routes} from '../../services/Routes';
import {ProtectedRoute} from '../common/protected-route/protected-route';
import {ForgotPassword, Login, Main, Orders, Page404, Profile, Register, ResetPassword} from '../../pages';
import {fetchIngredientsActionCreator} from '../../services/actions';
import {useLocation} from 'react-router-dom'


function App() {
    const state = useSelector((state: RootState) => ({...state}));
    const {state: locationState} = useLocation<LocationState>();

    const modalIngredient = locationState?.modalIngredient === true;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIngredientsActionCreator());
    }, [dispatch]);


    return (
        <div className={styles.App}>
            <AppHeader/>
            <Switch>
                <Route path={modalIngredient ? Routes.ingredient : Routes.main} exact={true}><Main/></Route>
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
                <Route><Page404/></Route>
            </Switch>
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
                state.isModalOrderOpen && state.orderId != null && (
                    <Modal>
                        <OrderDetails/>
                    </Modal>
                )
            }
        </div>
    );
}

export default App;
