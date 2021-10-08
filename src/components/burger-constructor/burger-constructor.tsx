import React from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorOrder } from './components/burger-constructor-order/burger-constructor-order';
import { IConstructorElementData, IConstructorElementType } from '../../services/model/IConstructorElementData';
import { onIngredientDropActionCreator } from '../../services/actions';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { IdObject } from '../../services/model/IdObject';
import { DraggableBurgerConstructorItem } from './components/draggable-burger-constructor-item/draggable-burger-constructor-item';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMainState } from '../../services/hooks/useMainState';

function mapBun(bun: IConstructorElementData, suffix: string, type: IConstructorElementType): IConstructorElementData {
  return {
    ...bun,
    text: `${bun.text} (${suffix})`,
    type,
    isLocked: true,
  };
}

export function BurgerConstructor() {
  const dispatch = useDispatch();

  const { selectedBun, selectedParts: parts, sum } = useMainState();

  const [_, dropTargetRef] = useDrop({
    accept: 'item',
    drop(item) {
      const { id } = item as IdObject;
      dispatch(onIngredientDropActionCreator(id));
    },
  }, [dispatch]);

  return (
    <section className={`mt-4 mb-4 ${styles.main}`} ref={dropTargetRef}>
      {selectedBun && <ConstructorElement {...mapBun(selectedBun, 'верх', IConstructorElementType.TOP)} />}
      <div className={`mt-4 mb-4 ${styles.list}`}>
        {parts.map(part => (
          <DraggableBurgerConstructorItem key={part.selectedId} {...part} />))}
      </div>
      {selectedBun && <ConstructorElement {...mapBun(selectedBun, 'низ', IConstructorElementType.BOTTOM)} />}
      {sum > 0 && selectedBun && (
        <div className={`mt-10 mb-10 ${styles.sum}`}>
          <BurgerConstructorOrder />
        </div>
      )}
    </section>
  );
}