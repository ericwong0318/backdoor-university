import { ReadMoreRounded } from "@mui/icons-material";
import { api } from "../App/constants"
import { IProgramme, IUser, UserRoleEnum } from "../App/interfaces"

export enum ActivateAccountErrorType {
    ServerUnavailable,
    EmailNotRegisterd,
    Unknown
}

export const activateEmail = (email: string,
    successCallback?: VoidFunction,
    failedCallback?: (err: ActivateAccountErrorType) => void) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(`${api.url}${api.activateEmail}/${email}`)
    fetch(`${api.url}${api.activateEmail}/${email}`, {
        method: "GET",
    }).then(res => {
        res.json().then(val => {
            if (val.err) {
                // Activate failed
                if (failedCallback)
                    failedCallback(ActivateAccountErrorType.EmailNotRegisterd)
                return
            }

            if (val.msg) {
                // Success
                if (successCallback)
                    successCallback();
                return
            }

            // Unknown reason
            if (failedCallback)
                failedCallback(ActivateAccountErrorType.Unknown)
        })
    }).catch(err => {
        if (failedCallback)
            failedCallback(ActivateAccountErrorType.ServerUnavailable)
    })
}

export enum GetUserErrorType {
    ServerUnavailable,
    NoUserFound,
    Unknown
}

export const getUser = (data: any, successCallback?: (user: IUser) => void, failedCallback?: (err: GetUserErrorType) => void, waitForPhoto = false) => {
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
                    if (successCallback && !waitForPhoto)
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
    const path = (role === UserRoleEnum.admin) ? api.adminChangePW : api.userChangePW;


    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = { email: email, oldPassword: oldPassword, newPassword: newPassword }

    fetch(`${api.url}${path}`,
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

export enum ModifyUserInfoErrorType {
    ServerUnavailable,
    Failed,
}

export const updateUser = (data: FormData,
    successCallback?: VoidFunction,
    failedCallback?: (err: ModifyUserInfoErrorType) => void) => {
    fetch(`${api.url}${api.updateUserInfo}`, {
        method: "POST",
        body: data,
    }).then(res => {
        res.json().then(val => {
            if (val.err) {
                if (failedCallback)
                    failedCallback(ModifyUserInfoErrorType.Failed)
                return
            }

            if (val.msg) {
                if (successCallback)
                    successCallback();
            }
        })
    }).catch(err => {
        if (failedCallback)
            failedCallback(ModifyUserInfoErrorType.ServerUnavailable);
    })
}

export enum GetAllRequestErrorType {
    ServerUnavailable,
    NoRecordFound,
}

export const getAllUser = (successCallback?: (params: any[]) => void,
    failedCallback?: (err: GetAllRequestErrorType) => void) => {
    fetch(`${api.url}${api.getAllUser}`, {
        method: "POST",
    }).then(res => {
        if (res.status && res.status === 401) {
            if (failedCallback)
                failedCallback(GetAllRequestErrorType.NoRecordFound);
            return;
        }

        res.json().then((val) => {
            const res: any = []
            val.forEach((v: any) => {
                res.push({
                    email: v.email,
                    name: v.name,
                    photo: null,
                    school: v.currProgramme.school,
                    programme: v.currProgramme.programme,
                    type: v.type,
                    admissionYear: v.addmissionYear,
                    cgpa: v.cgpa,
                    exam: v.exam,
                    status: v.status,
                    offer: v.offer,
                })
            })

            if (successCallback)
                successCallback(res)
        }).catch(reason => {
            if (failedCallback)
                failedCallback(GetAllRequestErrorType.NoRecordFound);
            return;
        })
    }).catch(err => {
        if (failedCallback)
            failedCallback(GetAllRequestErrorType.ServerUnavailable)
    })
}

// export const toIUser= (data:any):IUser=>{

// }

export const getAllProgramme = (
    successCallback?: (data: any) => void,
    failedCallback?: (err: GetAllRequestErrorType) => void
) => {
    fetch(`${api.url}${api.getAllProgramme}`, {
        method: "POST",
    }).then(res => {
        if (res.status && res.status === 401) {
            if (failedCallback)
                failedCallback(GetAllRequestErrorType.NoRecordFound);
            return;
        }

        res.json().then((val) => {
            console.log(val)
            const res: (any)[] = []
            val.forEach((v: any) => {
                res.push({
                    id: v._id,
                    school: v.school,
                    programme: v.programme,
                    type: v.type,
                    info: v.info,
                    comments: v.comments,
                })
            })

            if (successCallback)
                successCallback(res);
        }).catch(reason => {
            if (failedCallback)
                failedCallback(GetAllRequestErrorType.NoRecordFound);
            return;
        })
    }).catch(err => {
        if (failedCallback)
            failedCallback(GetAllRequestErrorType.ServerUnavailable)
    })

}

export const addNewProgramme = () => {

}

export const updateProgramme = () => {

}

export const submitComment = () => {

}