import React from 'react';
import ReactDom from 'react-dom';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
    children?: React.ReactNode
}

export function ModalOverlay({children}: IModalOverlayProps) {

    return ReactDom.createPortal(
        (
            <div className={styles.main}>
                <div className={`pt-30 pb-30 pl-25 pr-25 ${styles.window}`}>
                    {children}
                </div>
            </div>
        ),
        document.body
    )
}