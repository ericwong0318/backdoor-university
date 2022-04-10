/* 
    This file contained all the info of the backend, including the url, request path, etc.
    Any feature that needed to send request to the backend MUST use the info in this file for generality.
*/

export const api = {
    url: 'http://localhost:3001',
    pathRegister: '/register',
    pathLogin: '/login',
    pathResetPW: '/resetPassword',
}