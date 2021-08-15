import React from 'react';
import styles from './burger-ingredients-section.module.css';
import { IBurgerPart, IBurgerPartPropType } from '../../../../model/IBurgerPart';
import { BurgerIngredientsItem } from '../burger-ingredients-item/burger-ingredients-item';
import PropTypes from 'prop-types';

export interface IBurgerConstructorSectionProps {
	title: string;
	parts: IBurgerPart[];
	ref: React.MutableRefObject<any>
}

BurgerIngredientsSection.propTypes = {
	title: PropTypes.string.isRequired,
	parts: PropTypes.arrayOf(IBurgerPartPropType),
};

export function BurgerIngredientsSection({ title, parts }: IBurgerConstructorSectionProps) {
	return (
		<section className={`${styles.section} mt-10`}>
			<span className='text text_type_main-medium'>{title}</span>
			<div className={`mt-6 pl-4 ${styles.list}`}>
				{parts.map(p => (
					<BurgerIngredientsItem key={p._id} part={p} />
				))}
			</div>
		</section>
	);
}