import React from 'react';
import styles from './burger-constructor-section.module.css';
import {IBurgerPart} from "../../../../model/IBurgerPart";

export interface IBurgerConstructorSectionProps {
    title: string;
    parts: IBurgerPart[];
}

export function BurgerConstructorSection({title, parts}: IBurgerConstructorSectionProps) {
    return (
        <section className={`${styles.section} mt-10`}>
            <span className='text text_type_main-medium'>{title}</span>
            <div className='mt-6'>
                {parts.map(p => (
                    <div key={p._id}>{p.name}</div>
                ))}
            </div>
        </section>
    );
}