import React, { useCallback } from 'react';
import styles from './burger-constructor-order.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { MoneyCounter } from '../../../common/money-counter/money-counter';
import { useDispatch } from 'react-redux';
import { MainActionType, ORDERS_ACTION } from '../../../../services/actions';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../../services/Routes';
import { useMainState, useOrderState } from '../../../../services/hooks';


export function BurgerConstructorOrder() {
  const dispatch = useDispatch();
  const { isAuthorized } = useMainState();
  const { sum } = useOrderState();
  const history = useHistory();

  const onOrderButtonClick = useCallback(() => {
    if (isAuthorized) {
      dispatch(ORDERS_ACTION.orderAuthorizedActionCreator());
    } else {
      dispatch({ type: MainActionType.SAVE_AFTER_LOGGING_URL, url: Routes.main });
      history.replace({
        pathname: Routes.login,
      });
    }
  }, [dispatch, isAuthorized, history]);

  return (
    <div className={`mr-4 ${styles.main}`}>
      <div className='mr-10'><MoneyCounter sum={sum} big /></div>
      <Button type='primary' size='large' onClick={onOrderButtonClick}>
        {isAuthorized ? 'Оформить заказ' : 'Авторизуйтесь'}
      </Button>
    </div>
  );
}