export const Routes = {
    main: '/',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    profile: '/profile',
    ingredient: '/ingredients/:id',
    ingredientLinkCreator: (id: string) => `/ingredients/${id}`
}