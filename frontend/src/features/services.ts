/**
 * This file contains the functions that related to the backend APIs. 
 */

import { api } from "../App/constants"
import { IUser } from "../App/interfaces"

export enum ActivateAccountErrorType {
    ServerUnavailable,
    EmailNotRegisterd,
    Unknown
}

/**
 * Activate the account associated to the given email address.
 * @param email The email of the account to be activated
 * @param successCallback The function to be called when the account is activated successfully
 * @param failedCallback The function to be called when the account activation failed.
 */
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

/**
 * Attempt to retrieve the user data from the backend with the query provided.
 * @param data The query data to be sent to the backend
 * @param successCallback The callback function when the server returns a user.
 * @param failedCallback The function to be called when no data matches the query data.
 * @param waitForPhoto Should the function wait for the profile picture to be completely received before calling the success callback.
 */
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

/**
 * Attempting to update the password of an account as the account owner.
 * @param email The email address of the account to be updated
 * @param oldPassword The old password of the account
 * @param newPassword The updated new password of the account
 * @param successCallback The function to be called when the update is success
 * @param failedCallback The function to be called when the update is failed by any means
 */
export const updatePasswordAsUser = (email: string, oldPassword: string, newPassword: string,
    successCallback: VoidFunction,
    failedCallback: (err: ModifyPasswordErrorType) => void) => {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = { email: email, oldPassword: oldPassword, newPassword: newPassword, password: newPassword }

    fetch(`${api.url}${api.userChangePW}`,
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

/**
 * Attempting to update the password of a specific account as the admin
 * @param email The email of the account to be updated
 * @param password The new password of the account
 * @param successCallback The function to be called after the update is completed
 * @param failedCallback The function to be called when the update is failed
 */
export const updatePasswordAsAdmin = (email: string, password: string,
    successCallback: VoidFunction,
    failedCallback: (err: ModifyPasswordErrorType) => void) => {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = { email: email, password: password }

    fetch(`${api.url}${api.adminChangePW}`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        }
    ).then(res => {
        res.json().then(val => {
            if (val.err) {
                switch (val.err) {
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

/**
 * Update the profile information of a user 
 * @param data The updated user profile info
 * @param successCallback The function to be called when the update complete
 * @param failedCallback The function to be called when the update failed
 */
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

/**
 * Retrieve all the information of all users from the backend.
 * @param successCallback The function to be called when the action is completed
 * @param failedCallback The function to be called when the action is failed
 */
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

/**
 * Retrieve all the programme information from the backend
 * @param successCallback The function to be called when the action is completed
 * @param failedCallback The function to be called when the action is failed
 */
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

            // return res;

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


export enum UpdateProgrammeErrorType {
    Fail,
    ServerUnavailable,
    Unknown,
}

/**
 * Create and add a new programme to the database
 * @param name The name of the new programme
 * @param school The school of the new programme
 * @param type The type of the new programme. Accept values including: hd, asso, undergrad
 * @param info The description of the new programme
 * @param successCallback The function to be called when the action is completed
 * @param failedCallback The function to be called when the action is failed
 */
export const addNewProgramme = (name: string, school: string, type: string, info: string,
    successCallback?: VoidFunction,
    failedCallback?: (err: UpdateProgrammeErrorType) => void
) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = new FormData();
    body.append('programme', name.trim())
    body.append('school', school.trim())
    body.append('type', type.trim())
    body.append('info', info.trim())

    fetch(`${api.url}${api.addNewProgramme}`, {
        method: 'POST',
        body: body,
    }).then(res => {
        res.json().then(val => {
            if (val.msg) {
                // Success
                if (successCallback)
                    successCallback()
                return
            }

            // Fail
            if (val.err) {
                if (failedCallback)
                    failedCallback(UpdateProgrammeErrorType.Fail)
            }
        })
    }).catch(reason => {
        if (failedCallback)
            failedCallback(UpdateProgrammeErrorType.ServerUnavailable)
    })
}

/**
 * Attempt to update an existing programme in the database
 * @param oldSchool The original school name of the programme
 * @param oldProgramme The old name of the programme
 * @param newSchool The new school name of the programme
 * @param newProgramme The new name of the programme
 * @param type The new type of the programme. Accept values: hd, asso, undergrad
 * @param info The new description of the programme
 * @param successCallback The function to be called when the action is completed
 * @param failedCallback The function to be called when the action is failed
 */
export const updateProgramme = (oldSchool: string, oldProgramme: string, newSchool: string, newProgramme: string, type: string, info: string,
    successCallback?: VoidFunction,
    failedCallback?: (err: UpdateProgrammeErrorType) => void
) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // const body = { oldSchool: oldSchool.trim().toString(), oldProgramme: oldProgramme.trim().toString(), newSchool: newSchool.trim().toString(), newProgramme: newProgramme.trim().toString(), type: type.trim().toString(), info: info.trim().toString() }

    const body = new FormData();
    body.append('oldSchool', oldSchool.trim())
    body.append('oldProgramme', oldProgramme.trim())
    body.append('newSchool', newSchool.trim())
    body.append('newProgramme', newProgramme.trim())
    body.append('type', type.trim())
    body.append('info', info.trim())

    fetch(`${api.url}${api.updateProgramme}`, {
        method: "POST",
        body: body
    }).then(res => {
        res.json().then(val => {
            if (val.msg) {
                // Success
                if (successCallback)
                    successCallback()
                return
            }

            if (val.err) {
                // Fail
                if (failedCallback)
                    failedCallback(UpdateProgrammeErrorType.Fail)
            }
        })
    }).catch(reason => {
        if (failedCallback)
            failedCallback(UpdateProgrammeErrorType.ServerUnavailable)
    })
}

/**
 * Submit a new comment on a programme to the database
 */
export const submitComment = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

}