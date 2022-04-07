import { backend } from "../../../Constants/RemoteInfo"

export interface ILoginFormData {
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