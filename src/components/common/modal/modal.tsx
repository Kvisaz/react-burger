import React, { SyntheticEvent, useCallback, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { ModalOverlay } from './components/modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { AppContext } from '../../../service/AppContext';
import { IBurgerActionType } from '../../../model/IBurgerAction';

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

	const { dispatch } = useContext(AppContext);

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
		document.addEventListener(KEY_DOWN, onKeyDown);
		return () => {
			document.body.removeEventListener(KEY_DOWN, onKeyDown);
		};
	}, [onKeyDown]);

	return ReactDOM.createPortal(
		(
			<div>
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
			</div>
		),
		document.body,
	);
}