import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"
import { StringMappingType } from "typescript"

export interface IUserProfileLocalizationStrings extends LocalizedStringsMethods {
    // Headers
    profile: string,
    curr_prog: string,
    offers: string,

    // Profile info headers
    email: string,
    username: string,
    avatar: string,
    programme: string,
    admission_year: string,
    cgpa: string,
    exam_name: string,
    exam_result: string,

    // Programme info headers
    school: string,
    prog_name: string,
    prog_type: string,
    prog_info: string,
    comments: string,
    subjects: string,
    interviews: string,


    // Fixed info
    undergrad: string,
    asso: string,
    hd: string,


    // Features
    edit: string,
    edit_profile: string,
    change_password: string,
    change_avatar: string,
}

export let UserProfileLocalizationStrings: IUserProfileLocalizationStrings
UserProfileLocalizationStrings = new LocalizedStrings({
    en: {
        // Headers
        profile: 'Profile',
        curr_prog: 'Current Programme',
        offers: 'Offers',

        // Profile info headers
        email: 'Email',
        username: 'Username',
        avatar: 'Profile Picture',
        programme: 'Programme',
        admission_year: 'Admission Year',
        cgpa: 'CGPA',
        exam_name: 'Taken Exam Name',
        exam_result: 'Taken Exam Result',

        // Programme info headers
        school: 'School',
        prog_name: 'Programme Name',
        prog_type: 'Type',
        prog_info: 'Info',
        comments: 'Comment',
        subjects: 'Subjects',
        interviews: 'Interviews',


        // Fixed info
        undergrad: 'Undergraduate',
        asso: 'Associate degree',
        hd: 'Higher Diploma',


        // Features
        edit: 'Edit',
        edit_profile: 'Edit Profile',
        change_password: 'Change Password',
        change_avatar: 'Edit Profile Picture',
    },
})