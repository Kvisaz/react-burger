export const Routes = {
  main: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  orderPage: '/order/:id',
  ingredient: '/ingredients/:id',
  ingredientLinkCreator: (id: string) => `/ingredients/${id}`,
  orderPageLinkCreator: (id: number) => `/order/${id}`,
  profileOrders: '/profile/orders',
  profileOrdersDetails: '/profile/orders/:id',
  orderFeed: '/feed',
  orderFeedDetails: '/feed/:id',
};


export interface LocationState {
  modalIngredient?: boolean;
  modalOrder?: boolean;
  backTo: string;
}