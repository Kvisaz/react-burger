import React from 'react';
import ReactDom from 'react-dom';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
    visible?: boolean;
    children?: React.ReactNode
}

export function ModalOverlay({visible, children}: IModalOverlayProps) {
    return ReactDom.createPortal(
        (
            <>
                {visible && (
                    <div className={styles.main}>
                        {children}
                    </div>
                )}
            </>
        ),
        document.body
    )
}