import React from 'react';
import styles from './burger-part.module.css';

interface IBurgerPartProps {
    index: number;
}

export function BurgerPart({index}: IBurgerPartProps) {
    const isOdd = index % 2 > 0;
    const oddClass = isOdd ? 'mr-6' : '';
    return (
        <div className={`mb-10 ${oddClass}`}>
            BurgerPart
        </div>
    )
}