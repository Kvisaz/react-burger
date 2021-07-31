import React, {SyntheticEvent, useCallback} from 'react';
import ReactDom from 'react-dom';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
    onClick: () => void;
    children?: React.ReactNode
}

export function ModalOverlay({onClick, children}: IModalOverlayProps) {

    const onClickHandler = useCallback((e: SyntheticEvent) => {
        e.stopPropagation();
        onClick();
    }, [onClick])

    return ReactDom.createPortal(
        (
            <div onClick={onClickHandler} className={styles.main}>
                {children}
            </div>
        ),
        document.body
    )
}