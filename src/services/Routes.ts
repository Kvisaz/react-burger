export const Routes = {
  main: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  orders: '/profile/orders',
  orderPage: '/profile/orders/:id',
  ingredient: '/ingredients/:id',
  feed: './feed',
  feedId: './feed/:id',
  ingredientLinkCreator: (id: string) => `/ingredients/${id}`,
  orderPageLinkCreator: (id: number) => `/order/${id}`,
  feedIdLinkCreator: (id: number) => `/feed/${id}`,
};


export interface LocationState {
  modalIngredient?: boolean;
  modalOrder?: boolean;
  backTo: string;
}