export const Routes = {
    main: '/',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    profile: '/profile',
    page404: '/404',
    ingredient: '/ingredients/:id',
    ingredientLinkCreator: (id: string) => `/ingredients/${id}`
}