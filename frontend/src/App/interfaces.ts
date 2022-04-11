export interface IUser {
    email: string,
    name: string,
    photo: string | null,
    school: string,
    programme: string,
    type: 'undergrad' | 'asso' | 'hd',
    admissionYear: number,
    cgpa: number,
    exam: { name: string, result: string }
    status: 'unverified' | 'active' | 'banned',
    offer: { programme: IProgramme }[] | null
}

export interface IAdmin {
    email: string,
}

export interface IUserAbstract {
    user: IUser | IAdmin | null,
    role: UserTypeEnum
}

export enum UserTypeEnum {
    user,
    admin,
}

export interface IProgramme {
    school: string,
    programme: string,
    type: 'undergrad' | 'asso' | 'hd',
    info: string,
    comments: string[],
    subjects: string[],
    interviews: { user: IUser, data: string, content: string }[]
    | null | undefined,
}