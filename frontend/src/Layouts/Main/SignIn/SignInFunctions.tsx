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