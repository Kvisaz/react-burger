import React, { SyntheticEvent, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { ModalOverlay } from './components/modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IBurgerActionType } from '../../../services/actions';
import { useDispatch } from 'react-redux';

interface IModalProps {
	title?: string;
	children?: React.ReactNode
}

Modal.propTypes = {
	title: PropTypes.string,
	children: PropTypes.element,
};

const KEY_DOWN = 'keydown';

export function Modal({ title = '', children }: IModalProps) {

	const dispatch = useDispatch();

	const hide = useCallback(() => {
		dispatch({ type: IBurgerActionType.CLOSE_MODAL });
	}, [dispatch]);

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') hide();
	}, [hide]);

	const onWindowClick = useCallback((e: SyntheticEvent) => {
		e.stopPropagation();
	}, []);


	useEffect(() => {
		const element = document.body;
		element.addEventListener(KEY_DOWN, onKeyDown);
		return () => {
			element.removeEventListener(KEY_DOWN, onKeyDown);
		};
	}, [onKeyDown]);

	const modalElement = document.getElementById('modal');
	return modalElement && ReactDOM.createPortal(
		(
			<>
				<ModalOverlay onClick={hide} />
				<div className={styles.window} onClick={onWindowClick}>
					<div>
						<div className={`ml-10 mr-10 ${styles.head}`}>
							<div className={`text text_type_main-large ${styles.title}`}>{title}</div>
							<CloseIcon type={'primary'} onClick={hide} />
						</div>
						{children}
					</div>
				</div>
			</>
		),
		modalElement,
	);
}