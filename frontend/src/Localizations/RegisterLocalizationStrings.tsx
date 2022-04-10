import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"

export interface IRegisterLocalizationStrings extends LocalizedStringsMethods {
    username: string
    username_hint: string
    password: string
    confirm_password: string
    school: string
    programme: string
    cgpa: string
    exam_name: string
    exam_result: string
    register: string
    email: string
    login: string
    email_hint: string
    agree_statement: string
    field_empty_error: string
    email_format_error: string
    password_not_match_error: string
    weak_password_error: string
    email_used_error: string
    username_used_error: string
    did_not_agree_error: string
    registering: string
    server_unavailable_error: string
    success: string
    success_message: string
    back_to_login: string
    choose_photo: string
    no_file_error: string
}

export let RegisterLocalizationStrings: IRegisterLocalizationStrings
RegisterLocalizationStrings = new LocalizedStrings({
    en: {
        username: "Nick Name",
        username_hint: "Your Nick Name",
        password: "Password",
        confirm_password: "Confirm Password",
        school: "Current School",
        programme: "Current Study Programme",
        cgpa: "Current CGPA",
        exam_name: "Taken Exam Name",
        exam_result: "Exam Result",
        register: "Register",
        login: "Login",
        email: "School Email Adress",
        email_hint: "Your School Email",
        agree_statement: "I agree that there is nothing to agree.",
        field_empty_error: "* This feild is required!",
        email_format_error: "* Invalid email!",
        password_not_match_error: "* The passwords do not match!",
        weak_password_error: "* The password is too weak!",
        email_used_error: "* This email has been registered!",
        username_used_error: "* The username has been taken!",
        did_not_agree_error: "* This has to be checked!",
        registering: "Registering . . . ",
        server_unavailable_error: "Sorry! The server is current down for maintainance!",
        success: "Success",
        success_message: "Please check the veriftication email, including spam folder!",
        back_to_login: "Back to login",
        choose_photo: "Choose a photo...",
        no_file_error: "Please upload a profile picture!",
    },
    // zh: {
    //     password: "密碼",
    //     register: "註冊帳號",
    //     login: "登入",
    //     email: "電郵",
    // },
})