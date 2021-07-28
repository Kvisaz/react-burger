import React from 'react';
import styles from './burger-ingredients-section.module.css';
import {IBurgerPart} from "../../../../model/IBurgerPart";
import {BurgerIngredientsItem} from '../burger-ingredients-item/burger-ingredients-item';

export interface IBurgerConstructorSectionProps {
    title: string;
    parts: IBurgerPart[];
}

export function BurgerIngredientsSection({title, parts}: IBurgerConstructorSectionProps) {
    return (
        <section className={`${styles.section} mt-10`}>
            <span className='text text_type_main-medium'>{title}</span>
            <div className={`mt-6 pl-4 ${styles.list}`}>
                {parts.map(p => (
                    <BurgerIngredientsItem key={p._id} part={p} amount={Math.floor(Math.random() * 6 - 3)}/>
                ))}
            </div>
        </section>
    );
}