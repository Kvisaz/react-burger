import React from 'react';
import styles from './burger-constructor-section.module.css';
import {IBurgerPart} from "../../../../model/IBurgerPart";
import {BurgerConstructorItem} from '../burger-constructor-item/burger-constructor-item';

export interface IBurgerConstructorSectionProps {
    title: string;
    parts: IBurgerPart[];
}

export function BurgerConstructorSection({title, parts}: IBurgerConstructorSectionProps) {
    return (
        <section className={`${styles.section} mt-10`}>
            <span className='text text_type_main-medium'>{title}</span>
            <div className={`mt-6 pl-4 ${styles.list}`}>
                {parts.map(p => (
                    <BurgerConstructorItem key={p._id} part={p} />
                ))}
            </div>
        </section>
    );
}