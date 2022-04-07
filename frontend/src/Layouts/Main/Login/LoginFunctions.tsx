import { backend } from "../../../Constants/RemoteInfo"

export enum ErrorType {
    incorrect_email,
    incorrect_pw,
    server_unavailable,
    unknown,
}

export interface ILoginSuccess {

}

export interface ILoginFormData {
    email: string | undefined
    password: string | undefined
}

export interface IUserLoginSchema {
    email: string
    password: string
}

export interface ILoginErrorParameter {
    err: ErrorType
    msg: string
}

export const formKey = {
    email: 'email',
    password: 'password',
}

export const toLoginFormData = (data: FormData): ILoginFormData => {
    return {
        email: data.get(formKey.email)?.toString(),
        password: data.get(formKey.password)?.toString(),
    }
}

export const toUserLoginSchema = (data: ILoginFormData): IUserLoginSchema => {
    return {
        email: data.email!,
        password: data.password!
    }
}

export const LoginWithData = (
    data: IUserLoginSchema,
    successCallback: () => void,
    failedCallback: (err: ILoginErrorParameter) => void
) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(`${backend.url}${backend.pathLogin}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(toUserLoginSchema(data))
    }).then(response => {
        response.json().then(val => {
            if (val.msg) {
                // Login success
                successCallback();
            }
            else if (val.err) {
                // Login failed
                if (val.err === 'incorrect email') {
                    failedCallback({
                        err: ErrorType.incorrect_email,
                        msg: val.err
                    })
                } else if (val.err === 'incorrect password') {
                    failedCallback({
                        err: ErrorType.incorrect_pw,
                        msg: val.err
                    })
                }
            }
        }).catch(reason => {
            // Unknown reason: probably json failed
            failedCallback({
                err: ErrorType.unknown,
                msg: reason
            })
        })
    }).catch(reason => {
        // server unavailable
        failedCallback({
            err: ErrorType.server_unavailable,
            msg: reason
        })
    })

}