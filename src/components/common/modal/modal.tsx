import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {ModalOverlay} from './components/modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

interface IModalProps {
    title?: string;
    visible?: boolean;
    children?: React.ReactNode
}

export function Modal({title='', visible, children}: IModalProps) {

    return ReactDOM.createPortal(
        (
            <ModalOverlay visible={visible}>
                <div className={styles.window}>
                    <div>
                        <div className={`ml-10 mr-10 ${styles.head}`}>
                            <div className={`text text_type_main-large ${styles.title}`}>{title}</div>
                            <CloseIcon type={'primary'} />
                        </div>
                        <div className={`${styles.content} `}>{children}</div>
                    </div>
                </div>

            </ModalOverlay>
        ),
        document.body
    )
}