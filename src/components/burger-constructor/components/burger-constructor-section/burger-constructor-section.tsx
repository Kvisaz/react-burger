import React from 'react';
import styles from './burger-constructor-section.module.css';

export interface IBurgerConstructorSectionProps {
    title: string;
    children: React.ReactNode;
}

export function BurgerConstructorSection({title, children}: IBurgerConstructorSectionProps) {
    return (
        <section className={`${styles.section} mt-10`}>
            <span className='text text_type_main-medium'>{title}</span>
            <div className='mt-6'>
                {children}
            </div>
        </section>
    );
}