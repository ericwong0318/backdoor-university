import { ReadMoreRounded } from "@mui/icons-material";
import { api } from "../App/constants"
import { IUser, UserRoleEnum } from "../App/interfaces"

export enum GetUserErrorType {
    ServerUnavailable,
    NoUserFound,
    Unknown
}

export const getUser = (data: any, successCallback?: (user: IUser) => void, failedCallback?: (err: GetUserErrorType) => void) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch(`${api.url}${api.getUser}`,
        {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        }).then(res => {
            if (res.status === 401) {
                // No user found
                if (failedCallback)
                    failedCallback(GetUserErrorType.NoUserFound);
            }

            res.json().then(val => {
                if (val) {
                    const user: IUser = {
                        email: val.email,
                        name: val.name,
                        photo: null,
                        school: val.currProgramme.school,
                        programme: val.currProgramme.programme,
                        type: val.currProgramme.type,
                        admissionYear: val.currProgramme.addmissionYear,
                        cgpa: val.currProgramme.cgpa,
                        exam: {
                            name: val.exam.name,
                            result: val.exam.result,
                        },
                        status: val.exam.status,
                        offer: val.exam.offer
                    }

                    // Get photo
                    fetch(`${api.url}${api.getPhoto}`, {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify({ photo: val.photo })
                    }).then(res => {
                        res.blob().then(b => {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                                user.photo = reader.result ? reader.result.toString() : null;

                                // Load photo complete
                                if (successCallback)
                                    successCallback(user);
                            }

                            reader.readAsDataURL(b);
                        })
                    })

                    // callback once before finish loading the photo
                    if (successCallback)
                        successCallback(user);
                }
            })
        }).catch(reason => {
            // Failed
            if (failedCallback)
                failedCallback(GetUserErrorType.ServerUnavailable);
        });
}

export enum ModifyPasswordErrorType {
    IncorrectEmail,
    IncorrectOldPassword,
    ServerUnavailable,
    Unknown
}

export const modifyPassword = (email: string, oldPassword: string, newPassword: string, role: UserRoleEnum,
    successCallback: VoidFunction,
    failedCallback: (err: ModifyPasswordErrorType) => void) => {
    const userRole = (role === UserRoleEnum.admin) ? 'admin' : 'user';

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = { email: email, oldPassword: oldPassword, newPassword: newPassword, role: userRole }

    fetch(`${api.url}${api.changePW}`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        }
    ).then(res => {
        res.json().then(val => {
            if (val.err) {
                switch (val.err) {
                    case 'Incorrect old password':
                        if (failedCallback)
                            failedCallback(ModifyPasswordErrorType.IncorrectOldPassword)
                        return;

                    case 'Incorrect email':
                        if (failedCallback)
                            failedCallback(ModifyPasswordErrorType.IncorrectEmail)
                        return;

                    default:
                        if (failedCallback)
                            failedCallback(ModifyPasswordErrorType.Unknown)
                        return;
                }
            }

            if (val.msg) {
                if (successCallback)
                    successCallback();
            }
        })
    }).catch(err => {
        if (failedCallback)
            failedCallback(ModifyPasswordErrorType.ServerUnavailable);
    })
}

// export const modifyUserInfo= ()