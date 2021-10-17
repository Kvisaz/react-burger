import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from './draggable-burger-constructor-item.module.css';
import { ORDERS_ACTION } from '../../../../services/actions';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';

interface IBurgerConstructorItemProps {
  ingredientId: string;
  selectedId: string;
  type?: 'top' | 'bottom';
  isLocked?: boolean;
  handleClose?: () => void;
  text: string;
  thumbnail: string;
  price: number;
}

DraggableBurgerConstructorItem.propTypes = {
  ingredientId: PropTypes.string.isRequired,
  selectedId: PropTypes.string.isRequired,
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  handleClose: PropTypes.func,
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

const BASKET_DRAGGABLE_TYPE = 'BASKET_DRAGGABLE_TYPE';

interface DragItem {
  orderIndex: number;
  selectedId: string;
  id: string;
  type: string;
}

export function DraggableBurgerConstructorItem(props: IBurgerConstructorItemProps) {
  const { selectedId, ingredientId } = props;
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: BASKET_DRAGGABLE_TYPE,
    item: () => ({ selectedId }),
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }, [selectedId]);

  const [_, dropRef] = useDrop({
    accept: BASKET_DRAGGABLE_TYPE,
    collect(monitor) {
      return {
        isHover: monitor.isOver(),
      };
    },
    hover(item: DragItem) {
      const selectedId1 = item.selectedId;
      const selectedId2 = selectedId;
      if (selectedId1 !== selectedId2) {
        dispatch(ORDERS_ACTION.swapBasketItem(selectedId1, selectedId2));
      }
    },
  }, [selectedId, dispatch]);

  dragRef(dropRef(ref));
  const opacity = isDragging ? 0 : 1;
  return (
    <div className={styles.basketItem} ref={ref} style={{ opacity }} data-cy="burger-basket-order-item">
      <ConstructorElement {...props}
                          handleClose={
                            () => dispatch(ORDERS_ACTION.removeFromBasket(
                              { selectedId, ingredientId },
                            ))
                          } />
    </div>

  );
}
