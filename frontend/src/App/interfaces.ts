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
    offer: { programme: IProgramme }[] | null
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