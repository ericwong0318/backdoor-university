import { api } from "../../../Constants/RemoteInfo";

export const formKey = {
    email: "email"
}

// Is email in right format?
export const verifyEmailFormat = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}

export enum ErrorType {
    email_error,
    server_unavailable,
    unknown
}

export interface IErrorParameter {
    type: ErrorType
    msg: string
}

export const resetPasswordWithEmail = (
    email: string,
    successCallback: () => void,
    failedCallback: (error: IErrorParameter) => void
) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(`${api.url}${api.pathResetPW}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email: email })
    }).then(response => {
        // Server response received
        response.json().then(val => {
            // Breakdown the json
            if (val.err) {
                // Incorrect email
                failedCallback({
                    type: ErrorType.server_unavailable,
                    msg: val.err
                });
            } else if (val.msg) {
                // Email sent
                successCallback();
            }
        })
    }).catch(reason => {
        // Server unavailable
        failedCallback({
            type: ErrorType.server_unavailable,
            msg: "success"
        });
    })
}