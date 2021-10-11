import React, { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorOrder } from './components/burger-constructor-order/burger-constructor-order';
import { IConstructorElementData, IConstructorElementType } from '../../services/model/IConstructorElementData';
import { ORDERS_ACTION } from '../../services/actions';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { IdObject } from '../../services/model/IdObject';
import { DraggableBurgerConstructorItem } from './components/draggable-burger-constructor-item/draggable-burger-constructor-item';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useOrderState } from '../../services/hooks';
import { Loading } from '../loading/loading';

function mapBun(bun: IConstructorElementData, suffix: string, type: IConstructorElementType): IConstructorElementData {
  return {
    ...bun,
    text: `${bun.text} (${suffix})`,
    type,
    isLocked: true,
  };
}

const NO_SELECTED_MESSAGE = 'Соберите еще один бургер, бросьте сюда что-нибудь из конструктора слева!';

export function BurgerConstructor() {
  const dispatch = useDispatch();

  const { selectedBun, selectedParts: parts, sum } = useOrderState();

  const isNoSelected = useMemo(() => selectedBun == null && parts?.length < 1, [selectedBun, parts]);


  const [_, dropTargetRef] = useDrop({
    accept: 'item',
    drop(item) {
      const { id } = item as IdObject;
      dispatch(ORDERS_ACTION.onIngredientDropActionCreator(id));
    },
  }, [dispatch]);

  return (
    <section className={`mt-4 mb-4 ${styles.main}`} ref={dropTargetRef}>
      {
        isNoSelected ? <Loading text={NO_SELECTED_MESSAGE} /> :
          selectedBun && <ConstructorElement {...mapBun(selectedBun, 'верх', IConstructorElementType.TOP)} />}
      <div className={`mt-4 mb-4 ${styles.list}`}>
        {parts.map(part => (
          <DraggableBurgerConstructorItem key={part.selectedId} {...part} />))}
      </div>
      {selectedBun && <ConstructorElement {...mapBun(selectedBun, 'низ', IConstructorElementType.BOTTOM)} />}
      {sum > 0 && selectedBun && (
        <div className={`mt-10 mb-10 ${styles.sum}`}>
          <BurgerConstructorOrder />
        </div>
      )
      }
    </section>
  );
}