/* 
    This json contained the routing path to different page.
    Any component that navigates to other page MUST use the paths defined in this json for gernerality
*/
export const LayoutPath = {
    home: "/",
    tips: "/tips",
    news: "/news",
    programme: "/programme",
    games: "/games",
    statistics: "/stats",
    login: "/login",
    register: "/register",
    forgotpassword: "/forgot-password",
    user: "/user",
    admin: "/admin",
    error: "/404",
    activate: '/activate-email',
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
    url: 'https://backdoor-university.herokuapp.com',
    pathRegister: '/register',
    pathLogin: '/login',
    pathUserLogin: '/user-login',
    pathAdminLogin: '/admin-login',
    pathResetPW: '/user-forget-password',
    changePW: '/modify-password',
    modifyInfo: '/modify-info',
    getUser: '/user-list-one',
    getPhoto: '/photo',
    getAllUser: '/list-all-users',
    getAllProgramme: '/list-all-programmes',
    addNewProgramme: '/create-a-programme',
    updateProgramme: '/modify-programme',
    submitComment: '/submit-a-comment',
    activateEmail: '/activate-email',
}