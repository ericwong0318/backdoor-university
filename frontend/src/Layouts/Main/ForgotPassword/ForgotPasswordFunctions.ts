import { backend } from "../../../Constants/RemoteInfo";

export const formKey = {
    email: "email"
}

// Is email in right format?
export const verifyEmailFormat = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}

export const resetPasswordWithEmail = (
    email: string,
    successCallback: () => void,
    failedCallback: (error: any) => void
) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(`${backend.url}${backend.pathResetPW}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email: email })
    }).then(response => {
        // Server response received
        response.json().then(val => {
            // Breakdown the json
        })
    }).catch(reason => {
        // Server unavailable
        failedCallback(reason);
    })
}