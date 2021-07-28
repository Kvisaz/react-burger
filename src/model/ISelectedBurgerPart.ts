import {IBurgerPart} from './IBurgerPart';

export interface ISelectedBurgerPart extends IBurgerPart {
    bunType?: BunType;
    locked?: boolean;
}

export enum BunType {
    top = 'top',
    bottom = 'bottom',
}