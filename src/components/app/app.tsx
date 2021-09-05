import React from 'react';
import styles from './app.module.css';
import {AppHeader} from '../app-header/app-header';
import {Modal} from '../common/modal/modal';
import {IngredientDetails} from '../burger-ingredients/components/ingredient-details/ingredient-details';
import {OrderDetails} from '../burger-constructor/components/order-details/order-details';
import {useSelector} from 'react-redux';
import {RootState} from '../../services/store';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Routes} from '../../services/Routes';
import {ProtectedRoute} from '../common/protected-route/protected-route';
import {ForgotPassword, Login, Main, Orders, Page404, Profile, Register, ResetPassword} from '../../pages';


function App() {
    const state = useSelector((state: RootState) => ({...state}));

    return (
        <div className={styles.App}>
            <AppHeader/>
            <Router>
                <Switch>
                    <Route path={Routes.main} exact={true}><Main/></Route>
                    <Route path={Routes.login} exact={true}><Login/></Route>
                    <Route path={Routes.register} exact={true}><Register/></Route>
                    <Route path={Routes.forgotPassword} exact={true}><ForgotPassword/></Route>
                    <Route path={Routes.resetPassword} exact={true}><ResetPassword/></Route>
                    <ProtectedRoute path={Routes.profile} exact={true}><Profile/></ProtectedRoute>
                    <ProtectedRoute path={Routes.orders} exact={true}><Orders/></ProtectedRoute>
                    <Route><Page404/></Route>
                </Switch>
            </Router>
            {
                state.isModalIngredientOpen && state.selectedIngredient && (
                    <Modal title={'Детали ингредиента'}>
                        <IngredientDetails/>
                    </Modal>
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
