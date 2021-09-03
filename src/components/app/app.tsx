import React from 'react';
import styles from './app.module.css';
import {AppHeader} from '../app-header/app-header';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients';
import {BurgerConstructor} from '../burger-constructor/burger-constructor';
import {Modal} from '../common/modal/modal';
import {IngredientDetails} from '../burger-ingredients/components/ingredient-details/ingredient-details';
import {OrderDetails} from '../burger-constructor/components/order-details/order-details';
import {useSelector} from 'react-redux';
import {RootState} from '../../services/store';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {Routes} from '../../services/Routes';
import {ExactRoute} from '../common/exact-route/exact-route';
import {ProtectedRoute} from '../common/protected-route/protected-route';
import {ForgotPassword, Login, Main, Page404, Profile, Register, ResetPassword} from '../../pages';


function App() {
    const state = useSelector((state: RootState) => ({...state}));

    return (
        <div className={styles.App}>
            <Router>
                <Switch>
                    <ExactRoute path={Routes.main}><Main/></ExactRoute>
                    <ExactRoute path={Routes.login}><Login/></ExactRoute>
                    <ExactRoute path={Routes.register}><Register/></ExactRoute>
                    <ExactRoute path={Routes.forgotPassword}><ForgotPassword/></ExactRoute>
                    <ExactRoute path={Routes.resetPassword}><ResetPassword/></ExactRoute>
                    <ProtectedRoute path={Routes.profile}><Profile/></ProtectedRoute>
                    <ExactRoute path={Routes.page404}><Page404/></ExactRoute>
                </Switch>
            </Router>
            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.content}>
                    <div className={styles.col_left}>
                        <span className='text text_type_main-large'>Соберите бургер</span>
                        <BurgerIngredients/>
                    </div>
                    <div className={styles.col_right}>
                        <BurgerConstructor/>
                    </div>
                </main>
            </DndProvider>
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
