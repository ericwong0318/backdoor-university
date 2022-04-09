/* 
    This json contained the routing path to different page.
    Any component that navigates to other page MUST use the paths defined in this json for gernerality
*/
export const LayoutPath = {
    home: "/",
    tips: "/tips",
    news: "/news",
    programme: "/programme",
    statistics: "/stats",
    login: "/login",
    register: "/register",
    forgotpassword: "/forgot-password",
    user: "/user",
    admin: "/admin",
    default: "*",
}

export const AdminDashboardPath = {
    myProfile: "/my-profile",
    users: "/users",
    programmes: "/programmes",
    comments: "/comments",
}

/* 
    This json contained all the info of the backend, including the url, request path, etc.
    Any feature that needed to send request to the backend MUST use the info in this json for generality.
*/
export const api = {
    url: 'http://localhost:3001',
    pathRegister: '/register',
    pathLogin: '/login',
    pathResetPW: '/forget-password',
    changePW: '/modify-password',
}