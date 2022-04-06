export interface ISignUpFormData {
    email: string | undefined
    username: string | undefined
    password: string | undefined
    confirmPassword: string | undefined
    school: string | undefined
    programme: string | undefined
    cgpa: string | undefined
    examName: string | undefined
    examResult: string | undefined
}

export interface IUserRegisterSchema {
    email: string
    password: string
    school: string
    programme: string
    cgpa: string
    examname: string
    result: string
}

export const formKey = {
    email: "email",
    username: "username",
    password: "password",
    confirmPassword: "confirm-password",
    school: "school",
    programme: "programme",
    cgpa: "cgpa",
    examName: "examname",
    examResult: "result",
}

export const toSignUpFormData = (data: FormData): ISignUpFormData => {
    return {
        email: data.get(formKey.email)?.toString(),
        username: data.get(formKey.username)?.toString(),
        password: data.get(formKey.password)?.toString(),
        confirmPassword: data.get(formKey.confirmPassword)?.toString(),
        school: data.get(formKey.school)?.toString(),
        programme: data.get(formKey.programme)?.toString(),
        cgpa: data.get(formKey.cgpa)?.toString(),
        examName: data.get(formKey.examName)?.toString(),
        examResult: data.get(formKey.examResult)?.toString(),
    }
}

export const toUserRegiserSchema = (data: ISignUpFormData): IUserRegisterSchema => {
    return {
        email: data.email!,
        password: data.password!,
        school: data.school!,
        programme: data.programme!,
        cgpa: data.cgpa!,
        examname: data.examName!,
        result: data.examResult!,
    }
}

// Is two password match?
export const verifyConfirmPassword = (data: ISignUpFormData): boolean => {
    return data.password === data.confirmPassword;
}

// Is password strong enought?
export const verifyStrongPassword = (data: ISignUpFormData): boolean => {
    const regex = /(?=.{8,})/

    return regex.test(data.password!);
}

// Is email in right format?
export const verifyEmailFormat = (data: ISignUpFormData) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(data.email!);
}

// Has email been registered?
export const verifyEmailAvailable = (data: ISignUpFormData): boolean => {
    // TODO: let backend check
    return true;
}

// Has username been taken?
export const verifyUsernameAvailable = (data: ISignUpFormData): boolean => {
    // TODO: let backend check
    return true;
}