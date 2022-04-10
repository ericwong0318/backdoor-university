import { api } from "../App/constants"
import { IUserAbstract, UserTypeEnum } from "../App/interfaces"
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

export const login = (email: string, password: string,
    successCallback?: (data: IUserAbstract) => void,
    failedCallback?: (err: ILoginErrorParameter) => void) => {
    // Attempt login as user first
    loginAsUser(email, password, successCallback, () => {
        // Attempt login as admin when failed
        loginAsAdmin(email, password, successCallback, failedCallback)
    })

}

const loginAsUser = (email: string, password: string,
    successCallback?: (data: IUserAbstract) => void,
    failedCallback?: (err: ILoginErrorParameter) => void) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(`${api.url}${api.pathLogin}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email: email.trim(), password: password.trim(), role: "user" })
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
                sessionStorage.setItem('email', email.trim());
                sessionStorage.setItem('password', password.trim());

                // Get User Data by email
                getUser({ email: email }, (user) => {
                    // Retrieved data
                    if (successCallback)
                        successCallback({ user: user, role: UserTypeEnum.user });
                }, (err) => {
                    // Can't get data yet, still trigger the callback and let other components get the data later
                    if (successCallback)
                        successCallback({ user: null, role: UserTypeEnum.user });
                })
            }
            else if (val.err) {
                // Login failed
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

const loginAsAdmin = (email: string, password: string,
    successCallback?: (data: IUserAbstract) => void,
    failedCallback?: (err: ILoginErrorParameter) => void) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(`${api.url}${api.pathLogin}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email: email, password: resetPasswordWithEmail, role: "admin" })
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
                    successCallback({ user: { email: email }, role: UserTypeEnum.admin });
            }
            else if (val.err) {
                // Login failed
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