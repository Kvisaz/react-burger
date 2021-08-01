import React, {SyntheticEvent, useCallback} from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

interface IModalOverlayProps {
    onClick: () => void;
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export function ModalOverlay({onClick}: IModalOverlayProps) {

    const onClickHandler = useCallback((e: SyntheticEvent) => {
        e.stopPropagation();
        onClick();
    }, [onClick])

    return (
        <div onClick={onClickHandler} className={styles.main}>
        </div>
    )
}