import React, { useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-item.module.css';
import { IBurgerPart, IBurgerPartPropType } from '../../../../services/model/IBurgerPart';
import { MoneyCounter } from '../../../common/money-counter/money-counter';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../../../services/Routes';
import { MAIN_ACTION } from '../../../../services/actions';
import { useOrderState } from '../../../../services/hooks';
import { useAppDispatch } from '../../../../services/hooks/useAppDispatch';

interface IBurgerConstructorItemProps {
  part: IBurgerPart;
}

BurgerIngredientsItem.propTypes = {
  part: IBurgerPartPropType.isRequired,
};

export function BurgerIngredientsItem({ part }: IBurgerConstructorItemProps) {

  const dispatch = useAppDispatch();

  const [_, dragRef] = useDrag({
    type: 'item',
    item: { id: part._id },
  }, [part]);

  const { ingredientAmountMap } = useOrderState();
  const { price, name, image, _id } = part;
  const amount = ingredientAmountMap[_id] ?? 0;

  const history = useHistory();

  const onItemClick = useCallback((ingredient: IBurgerPart) => {
    dispatch(MAIN_ACTION.setModalUrlOn());
    history.replace({
      pathname: Routes.ingredientLinkCreator(ingredient._id),
    });

  }, [history, dispatch]);

  const hasAmount = amount > 0;
  const counter = hasAmount ? (<Counter count={amount} size='default' />) : null;
  return (
    <div data-cy="burger-part" className={styles.item} onClick={() => onItemClick(part)} ref={dragRef}>
      <img src={image} alt={name} className={styles.image} />
      <MoneyCounter sum={price} />
      <div className={`text text_type_main-default ${styles.name}`}>{name}</div>
      {counter}
    </div>
  );
}