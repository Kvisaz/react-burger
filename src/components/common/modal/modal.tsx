import React, {SyntheticEvent, useCallback, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {ModalOverlay} from './components/modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

interface IModalProps {
    title?: string;
    children?: React.ReactNode
    onHide: Function;
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
    onHide: PropTypes.func.isRequired
};

const KEY_DOWN = 'keydown';

export function Modal({title = '', onHide, children}: IModalProps) {

    const hide = useCallback(() => {
        onHide();
    }, [onHide]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") hide();
    }, [hide]);

    const onWindowClick = useCallback((e: SyntheticEvent) => {
        e.stopPropagation();
    }, []);


    useEffect(() => {
        document.addEventListener(KEY_DOWN, onKeyDown);
        return () => {
            document.body.removeEventListener(KEY_DOWN, onKeyDown);
        }
    }, [onKeyDown]);

    return ReactDOM.createPortal(
        (
            <div>
                <ModalOverlay onClick={hide}/>
                <div className={styles.window} onClick={onWindowClick}>
                    <div>
                        <div className={`ml-10 mr-10 ${styles.head}`}>
                            <div className={`text text_type_main-large ${styles.title}`}>{title}</div>
                            <CloseIcon type={'primary'} onClick={hide}/>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        ),
        document.body
    )
}