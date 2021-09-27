import React, { useCallback } from 'react';
import styles from './burger-constructor-order.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { MoneyCounter } from '../../../common/money-counter/money-counter';
import { useDispatch, useSelector } from 'react-redux';
import { IBurgerActionType, orderAuthorizedActionCreator } from '../../../../services/actions';
import { RootState } from '../../../../services/store';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../../services/Routes';


export function BurgerConstructorOrder() {
  const dispatch = useDispatch();
  const { isAuthorized, sum } = useSelector((state: RootState) => ({ ...state }));
  const history = useHistory();

  const onOrderButtonClick = useCallback(() => {
    if (isAuthorized) {
      dispatch(orderAuthorizedActionCreator());
    } else {
      dispatch({ type: IBurgerActionType.SAVE_AFTER_LOGGING_URL, url: Routes.main });
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