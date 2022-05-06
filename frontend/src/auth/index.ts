/*
    This file provided the authentication related functions.
*/

import { api } from "../App/constants"
import { IUserAbstract, UserRoleEnum } from "../App/interfaces"
import { getUser } from "../features/services"
import { resetPasswordWithEmail } from "../Layouts/Main/ForgotPassword/ForgotPasswordFunctions"
/*
    LOGIN
*/

export enum LoginErrorType {
    incorrect_email,
    incorrect_pw,
    incorrect_email_or_pw,
    server_unavailable,
    unknown,
}

export interface ILoginErrorParameter {
    type: LoginErrorType
    msg: string
}

/**
 * The general login attempt function. The user can be logged in as either admin or user with this function
 * @param email The email of the account
 * @param password The password of the account
 * @param successCallback The function to be called when the login attempt is successful.
 * @param failedCallback The function to be called when the login attempt is failed.
 */
export const login = (email: string, password: string,
    successCallback?: (data: IUserAbstract) => void,
    failedCallback?: (err: ILoginErrorParameter) => void) => {
    // Attempt login as admin first
    loginAsAdmin(email.trim(), password.trim(), successCallback, (err) => {
        // Attempt login as user when failed
        loginAsUser(email.trim(), password.trim(), successCallback, failedCallback)
    })

}

/**
 * Attempt to login as a normal user.
 * @param email The email of the user account
 * @param password The password of the user acount
 * @param successCallback The function to be called when the login attempt is successful.
 * @param failedCallback The function to be called when the login attempt is failed.
 */
const loginAsUser = (email: string, password: string,
    successCallback?: (data: IUserAbstract) => void,
    failedCallback?: (err: ILoginErrorParameter) => void) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(`${api.url}${api.userLogin}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email: email.trim(), password: password.trim(), role: "user" })
    }).then(response => {
        if (response.status)
            switch (response.status) {
                case 401:
                    if (failedCallback)
                        failedCallback({
                            type: LoginErrorType.incorrect_email_or_pw,
                            msg: response.statusText
                        })
                    return
            }

        response.json().then(val => {
            if (val.msg) {
                // Login success
                // Save to session storage
                sessionStorage.setItem('email', email.trim());
                sessionStorage.setItem('password', password.trim());

                // Get User Data by email
                getUser({ email: email }, (user) => {
                    // Retrieved data
                    if (successCallback)
                        successCallback({ user: user, role: UserRoleEnum.user });
                }, (err) => {
                    // Can't get data yet, still trigger the callback and let other components get the data later
                    if (successCallback)
                        successCallback({ user: null, role: UserRoleEnum.user });
                })
            }
            else if (val.err) {
                // Login failed
                if (failedCallback)
                    failedCallback({
                        type: LoginErrorType.incorrect_email_or_pw,
                        msg: val.err
                    })
            }
        }).catch(reason => {
            // Unknown reason: probably json failed
            if (failedCallback)
                failedCallback({
                    type: LoginErrorType.unknown,
                    msg: reason
                })
        })
    }).catch(reason => {
        // server unavailable
        if (failedCallback)
            failedCallback({
                type: LoginErrorType.server_unavailable,
                msg: reason
            })
    })
}

/**
 * The login function specifically for admin accounts. Attempting to login with a normal user account will result in fail.
 * @param email The email of the admin account
 * @param password The password of the admin account
 * @param successCallback The function to be called when the login attempt is successful
 * @param failedCallback The function to be called when the login attempt is failed
 */
const loginAsAdmin = (email: string, password: string,
    successCallback?: (data: IUserAbstract) => void,
    failedCallback?: (err: ILoginErrorParameter) => void) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(`${api.url}${api.adminLogin}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email: email, password: password, role: "admin" })
    }).then(response => {
        switch (response.status) {
            case 401:
                if (failedCallback)
                    failedCallback({
                        type: LoginErrorType.incorrect_email_or_pw,
                        msg: response.statusText
                    })
                break;
        }

        response.json().then(val => {
            if (val.msg) {
                // Login success
                // Save to session storage
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('password', password);

                if (successCallback)
                    successCallback({ user: { email: email }, role: UserRoleEnum.admin });
            }
            else if (val.err) {
                // Login failed
                console.log(val.err)
                if (val.err === 'incorrect email') {
                    if (failedCallback)
                        failedCallback({
                            type: LoginErrorType.incorrect_email,
                            msg: val.err
                        })
                } else if (val.err === 'incorrect password') {
                    if (failedCallback)
                        failedCallback({
                            type: LoginErrorType.incorrect_pw,
                            msg: val.err
                        })
                }
            }
        }).catch(reason => {
            // Unknown reason: probably json failed
            if (failedCallback)
                failedCallback({
                    type: LoginErrorType.unknown,
                    msg: reason
                })
        })
    }).catch(reason => {
        // server unavailable
        if (failedCallback)
            failedCallback({
                type: LoginErrorType.server_unavailable,
                msg: reason
            })
    })
}

/**
 * The user will be logged out upon calling this function.
 * @param callback The function to be called after the user has been logged out 
 */
export const logout = (callback?: VoidFunction) => {
    if (localStorage.getItem('email')) {
        localStorage.removeItem('email')
    }

    if (localStorage.getItem('password')) {
        localStorage.removeItem('password')
    }
    if (sessionStorage.getItem('email')) {
        sessionStorage.removeItem('email')
    }

    if (sessionStorage.getItem('password')) {
        sessionStorage.removeItem('password')
    }

    if (callback)
        callback();
}