export const Routes = {
    main: '/',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    profile: '/profile',
    orders: '/profile/orders',
    orderPage: '/order/:id',
    ingredient: '/ingredients/:id',
    ingredientLinkCreator: (id: string) => `/ingredients/${id}`,
    orderPageLinkCreator: (id: number) => `/order/${id}`
}


export interface LocationState {
    modalIngredient?: boolean;
    modalOrder?: boolean;
    backTo: string;
}