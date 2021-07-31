import React, {SyntheticEvent, useCallback} from 'react';
import ReactDom from 'react-dom';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

interface IModalOverlayProps {
    onClick: () => void;
    children?: React.ReactNode
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element
};

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