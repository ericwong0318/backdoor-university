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
    cancel: string,
    save: string,
    old_password: string,
    new_password: string,
    confirm: string,
    change_pw_success: string,
    opps: string,
    server_unavailable_error: string,

    // Errors
    old_pw_incorrect_error: string,
    new_pw_too_weak_error: string,
    new_old_pw_same_error: string,
    field_empty_error: string,
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
        cancel: "Cancel",
        save: "Save",
        old_password: "Old Password",
        new_password: "New Password",
        confirm: "Confirm",
        change_pw_success: "The password has changed!",
        opps: "Opps! Something went wrong!",

        // Errors
        old_pw_incorrect_error: "Incorrect old password!",
        new_pw_too_weak_error: "The password is too weak!",
        server_unavailable_error: "Sorry! The server is down for maintainance!",
        new_old_pw_same_error: "The new password and the old password cannot be the same!",
        field_empty_error: "This field cannot be empty!",
    },
})