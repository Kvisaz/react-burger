import PropTypes from 'prop-types';

export interface IBurgerPart {
    _id: string; // "60666c42cc7b410027a1a9b1",
    name: string; // "Краторная булка N-200i",
    type: string; // "bun",
    proteins: number; // 80,
    fat: number; // 24,
    carbohydrates: number; //53,
    calories: number; // 420,
    price: number; // 1255,
    image: string; // "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: string;// "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: string; // "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: number; // 0
}

export const IBurgerPartPropType = PropTypes.exact({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
})