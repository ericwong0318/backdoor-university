/*
    This file contained the interfaces, which are predefined object types, of the fronted.
    Mainly the schema of the data from the database.
*/

export interface IUser {
    email: string,
    name: string,
    photo: string | null,
    school: string,
    programme: string,
    type: string,
    admissionYear: number,
    cgpa: number,
    exam: { name: string, result: string }
    status: string,
    offer: { school: string, programme: string } | null
}

export interface IAdmin {
    email: string,
}

export interface IUserAbstract {
    user: IUser | IAdmin | null,
    role: UserRoleEnum
}

export enum UserRoleEnum {
    user,
    admin,
}

export interface IProgramme {
    school: string,
    programme: string,
    type: 'undergrad' | 'asso' | 'hd',
    info: string,
    comments: IComment[],
    // interviews: { user: IUser, data: string, content: string }[]
    // | null | undefined,
}

export interface IComment {
    content: string;
    email: string;
    _id: string;
}