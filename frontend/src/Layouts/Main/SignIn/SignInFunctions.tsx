import { backend } from "../../../Constants/RemoteInfo"

export interface ISignInFormData {
    email: string | undefined
    password: string | undefined
}

export interface IUserLoginSchema {
    email: string
    password: string
}

export const formKey = {
    email: 'email',
    password: 'password',
}

export const toSignInFormData = (data: FormData): ISignInFormData => {
    return {
        email: data.get(formKey.email)?.toString(),
        password: data.get(formKey.password)?.toString(),
    }
}

export const toUserLoginSchema = (data: ISignInFormData): IUserLoginSchema => {
    return {
        email: data.email!,
        password: data.password!
    }
}

export const SignInWithData = (
    data: IUserLoginSchema,
    successCallback: () => void,
    failedCallback: () => void
) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(`${backend.url}${backend.pathLogin}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(toUserLoginSchema(data))
    }).then(response => {
        response.json().then(val => {
            // Login success

        }).catch(reason => {

        })
    }, reason => {

    }).catch(reason => {
        // server unavailable
    })

}