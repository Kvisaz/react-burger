import React, {SyntheticEvent, useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {ModalOverlay} from './components/modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

interface IModalProps {
    title?: string;
    visible?: boolean;
    children?: React.ReactNode
    onHide: Function;
}

const KEY_DOWN = 'keydown';

export function Modal({title = '', visible = false, onHide, children}: IModalProps) {

    const [state, setState] = useState({visible});

    const hide = useCallback(() => {
        setState({visible: false});
        onHide();
    }, [onHide]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (!visible) return;
        if (e.key === "Escape") hide();
    }, [visible, hide]);

    const onWindowClick = useCallback((e: SyntheticEvent) => {
        e.stopPropagation();
    }, []);


    useEffect(() => {
        setState({visible});
    }, [visible]);

    useEffect(() => {
        document.addEventListener(KEY_DOWN, onKeyDown);
        return () => {
            document.body.removeEventListener(KEY_DOWN, onKeyDown);
        }
    }, [onKeyDown]);

    return ReactDOM.createPortal(
        (
            state.visible && (<ModalOverlay onClick={hide}>
                <div className={styles.window} onClick={onWindowClick}>
                    <div>
                        <div className={`ml-10 mr-10 ${styles.head}`}>
                            <div className={`text text_type_main-large ${styles.title}`}>{title}</div>
                            <CloseIcon type={'primary'} onClick={hide}/>
                        </div>
                        <div className={`${styles.content} `}>{children}</div>
                    </div>
                </div>
            </ModalOverlay>)
        ),
        document.body
    )
}