import React from 'react';
import styles from './nutrition.module.css';

interface INutritionProps {
    text: string;
    value: number;
}

export function Nutrition({text, value}: INutritionProps) {
    return (
        <div className={styles.nutrition}>
            <div className={`text text_type_main-default text_color_inactive`}>{text}</div>
            <div className={`text text_type_digits-default text_color_inactive`}>{value}</div>
        </div>
    )
}