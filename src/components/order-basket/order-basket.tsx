import React from 'react';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { useOrderState } from '../../services/hooks';
import { Loading } from '../loading/loading';


export function OrderBasket() {
  const { orderMessage, isBadOrderMessage } = useOrderState();
  return (
    <> {
      orderMessage ?
        <Loading text={orderMessage} alert={isBadOrderMessage} /> :
        <BurgerConstructor />
    }
    </>
  );
}