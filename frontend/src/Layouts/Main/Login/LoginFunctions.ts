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
        email: data.get(formKey.email)?.toString().trim(),
        password: data.get(formKey.password)?.toString().trim(),
    }
}

export const toUserLoginSchema = (data: ILoginFormData): IUserLoginSchema => {
    return {
        email: data.email!,
        password: data.password!
    }
}