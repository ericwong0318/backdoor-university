import { api } from "../App/constants"
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

export const login = (email: string, password: string, successCallback?: VoidFunction, failedCallback?: (err: ILoginErrorParameter) => void) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(`${api.url}${api.pathLogin}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email: email, password: password })
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
                    successCallback();
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

    if (callback)
        callback();
}