import React, {SyntheticEvent} from 'react';
import ReactDom from 'react-dom';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
    onClick: (e:SyntheticEvent)=>void;
    children?: React.ReactNode
}

export function ModalOverlay({onClick, children}: IModalOverlayProps) {
    return ReactDom.createPortal(
        (
            <div onClick={onClick} className={styles.main}>
                {children}
            </div>
        ),
        document.body
    )
}