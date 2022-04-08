import { EditLocationTwoTone, PanoramaFishEyeOutlined, ViewKanban } from "@mui/icons-material"
import { api } from "../../../App/constants"

export enum ErrorType {
    email_used,
    file_missing,
    server_unavailable,
    unknown,
}

export interface IRegisterFormData {
    email: string | undefined
    username: string | undefined
    password: string | undefined
    confirmPassword: string | undefined
    admissionYear: string | undefined
    school: string | undefined
    programme: string | undefined
    cgpa: string | undefined
    examName: string | undefined
    examResult: string | undefined
    file: File | undefined | null
}

export interface IUserRegisterSchema {
    email: string
    password: string
    school: string
    programme: string
    cgpa: string
    admissionYear: string
    examname: string
    result: string
    file: File
}

export interface IRegisterFailedCallbackParameters {
    type: ErrorType
    reason: string
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
    file: "photo",
    admissionYear: "addmissionYear",
}

export const toRegisterFormData = (data: FormData, file: File | undefined | null): IRegisterFormData => {
    return {
        email: data.get(formKey.email)?.toString(),
        username: data.get(formKey.username)?.toString(),
        password: data.get(formKey.password)?.toString(),
        confirmPassword: data.get(formKey.confirmPassword)?.toString(),
        school: data.get(formKey.school)?.toString(),
        programme: data.get(formKey.programme)?.toString(),
        admissionYear: data.get(formKey.admissionYear)?.toString(),
        cgpa: data.get(formKey.cgpa)?.toString(),
        examName: data.get(formKey.examName)?.toString(),
        examResult: data.get(formKey.examResult)?.toString(),
        file: file,
    }
}

export const toUserRegiserSchema = (data: IRegisterFormData, file: File): FormData => {
    const fd = new FormData()
    fd.append('email', data.email!)
    fd.append('name', data.username!)
    fd.append('password', data.password!)
    fd.append('school', data.school!)
    fd.append('programme', data.programme!)
    fd.append('cgpa', data.cgpa!)
    fd.append('examname', data.examName!)
    fd.append('result', data.examResult!)
    fd.append('addmissionYear', data.admissionYear!)
    fd.append('photo', file)
    return fd
}

// Is two password match?
export const verifyConfirmPassword = (data: IRegisterFormData): boolean => {
    return data.password === data.confirmPassword;
}

// Is password strong enought?
export const verifyStrongPassword = (data: IRegisterFormData): boolean => {
    const regex = /(?=.{8,})/

    return regex.test(data.password!);
}

// Is email in right format?
export const verifyEmailFormat = (data: IRegisterFormData) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(data.email!);
}

export const registerWithData = async (data: FormData,
    onSuccessCallback: () => void,
    onFailedCallback: (params: IRegisterFailedCallbackParameters) => void
) => {
    fetch(`${api.url}${api.pathRegister}`, {
        method: "POST",
        body: data,
    }).then(response => {
        if (response.status) {
            switch (response.status) {
                case 400:
                    // No files uploaded
                    onFailedCallback({
                        type: ErrorType.file_missing,
                        reason: "Photo missing"
                    })
                    break;

                case 409:
                    // Email used
                    onFailedCallback({
                        type: ErrorType.email_used,
                        reason: "Email used"
                    })
                    break;

                default:
                    onFailedCallback({
                        type: ErrorType.unknown,
                        reason: "unknown"
                    })
                    break;
            }
        }

        response.json().then(val => {
            console.log(val);
            if (val.msg) {
                onSuccessCallback()
            }
            if (val.err) {
                switch (val.err) {
                    case "No files are uploaded.":
                        break;

                    default:
                        onFailedCallback({
                            type: ErrorType.unknown,
                            reason: val.err
                        })
                        break;
                }
            }
        }, reason => {
            onFailedCallback({
                type: ErrorType.unknown,
                reason: reason
            })
        })
    }).catch(reason => {
        // server unavailble
        onFailedCallback({
            type: ErrorType.server_unavailable,
            reason: reason
        })
    })

}