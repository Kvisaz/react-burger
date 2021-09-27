import React from 'react';
import styles from './loading.module.css';

export function Loading() {
    return (
        <div className={styles.wrap}>
            <div className={`text text_color_inactive text_type_main-medium ${styles.content}`}>Loading...</div>
        </div>
    )
}