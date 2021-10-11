import React, { useCallback, useEffect, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { BurgerIngredientsTabs } from './components/burger-ingredients-tabs/burger-ingredients-tabs';
import { BurgerIngredientsSection } from './components/burger-ingredients-section/burger-ingredients-section';
import { IBurgerPart } from '../../services/model/IBurgerPart';
import { useDispatch } from 'react-redux';
import { MainActionType } from '../../services/actions';
import { useIngredientsState } from '../../services/hooks/useIngredientsState';

export function BurgerIngredients() {

  const { ingredients } = useIngredientsState();
  const dispatch = useDispatch();

  const listRef = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  const handleScroll: EventListener = useCallback((ev: Event) => {
    const listEl = ev.currentTarget as HTMLDivElement;
    const sectionEl1 = ref1.current;
    const sectionEl2 = ref2.current;
    const sectionEl3 = ref3.current;
    if (listEl && sectionEl1 && sectionEl2 && sectionEl3) {
      const listPosition = listEl.scrollTop;
      const deltas = [
        Math.abs(sectionEl1.offsetTop - listPosition) - sectionEl1.clientHeight * 0.6,
        Math.abs(sectionEl2.offsetTop - listPosition) - sectionEl2.clientHeight * 0.6,
        Math.abs(sectionEl3.offsetTop - listPosition) - sectionEl3.clientHeight * 0.6,
      ];
      let nearestIndex = 0;
      let min = deltas[0];
      for (let i = 1; i < deltas.length; i++) {
        const next = deltas[i];
        if (next < min) {
          min = next;
          nearestIndex = i;
        }
      }
      dispatch({ type: MainActionType.TAB_SELECT, index: nearestIndex });
    }
  }, [ref1, ref2, ref3, dispatch]);

  useEffect(() => {
    const { current } = listRef;
    current?.addEventListener('scroll', handleScroll);
    return () => {
      current?.removeEventListener('scroll', handleScroll);
    };
  }, [listRef, handleScroll]);

  const buns: IBurgerPart[] = [];
  const fills: IBurgerPart[] = [];
  const sauces: IBurgerPart[] = [];
  ingredients.forEach((part) => {
    switch (part.type) {
      case 'bun':
        buns.push(part);
        break;
      case 'main':
        fills.push(part);
        break;
      case 'sauce':
        sauces.push(part);
        break;
    }
  });


  return (
    <div className={`${styles.main}`}>
      <BurgerIngredientsTabs />
      <div className={`mb-10 ${styles.list}`} ref={listRef}>
        <div ref={ref1}><BurgerIngredientsSection title={'Булки'} parts={buns} /></div>
        <div ref={ref2}><BurgerIngredientsSection title={'Соусы'} parts={sauces} /></div>
        <div ref={ref3}><BurgerIngredientsSection title={'Начинки'} parts={fills} /></div>
      </div>
    </div>
  );
}