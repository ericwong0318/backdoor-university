

export interface IUser {
    email: string,
    name: string,
    photo: string,
    school: string,
    programme: string,
    type: 'undergrad' | 'asso' | 'hd',
    admissionYear: number,
    cgpa: number,
    exam: { name: string, result: string }
    status: 'unverified' | 'active' | 'banned',
    offer: { programme: IProgramme } | null
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