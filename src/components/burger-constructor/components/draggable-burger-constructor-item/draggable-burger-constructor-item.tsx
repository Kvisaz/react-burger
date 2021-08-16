import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from './draggable-burger-constructor-item.module.css';
import { IBurgerActionType } from '../../../../services/actions';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

interface IBurgerConstructorItemProps {
	ingredientId: string;
	selectedId: string;
	orderIndex: number;
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
	orderIndex: PropTypes.number.isRequired,
	type: PropTypes.string,
	isLocked: PropTypes.bool,
	handleClose: PropTypes.func,
	text: PropTypes.string.isRequired,
	thumbnail: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
};

const BASKET_DRAGGABLE_TYPE = 'BASKET_DRAGGABLE_TYPE';

interface DragItem {
	orderIndex: number
	id: string
	type: string
}

export function DraggableBurgerConstructorItem(props: IBurgerConstructorItemProps) {
	const { selectedId, ingredientId, orderIndex } = props;
	const dispatch = useDispatch();

	const ref = useRef<HTMLDivElement>(null);

	const [{ isDragging }, dragRef] = useDrag({
		type: BASKET_DRAGGABLE_TYPE,
		item: () => ({ orderIndex }),
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	}, [selectedId]);

	const [_, dropRef] = useDrop({
		accept: BASKET_DRAGGABLE_TYPE,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: DragItem, monitor: DropTargetMonitor) {
			const dragIndex = item.orderIndex;
			const hoverIndex = orderIndex;
			console.log('dragIndex', dragIndex);
			console.log('hoverIndex', hoverIndex);

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const clientOffset = monitor.getClientOffset();
			if (hoverBoundingRect === undefined || clientOffset === null) return;

			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			dispatch({ type: IBurgerActionType.BASKET_ITEM_DRAG, dragIndex, hoverIndex });
		},
	}, [selectedId, dispatch]);

	dragRef(dropRef(ref));
	const opacity = isDragging ? 0 : 1;
	return (
		<div className={styles.basketItem} ref={ref} style={{ opacity }}>
			<ConstructorElement {...props} handleClose={() => dispatch({
				type: IBurgerActionType.INGREDIENT_REMOVE_FROM_BASKET,
				payload: { selectedId, ingredientId },
			})} />
		</div>

	);
}
