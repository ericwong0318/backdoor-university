import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"

export interface ISignUpLocalizationStrings extends LocalizedStringsMethods {
    username: string
    username_hint: string
    password: string
    confirm_password: string
    sign_up: string
    email: string
    sign_in: string
    email_hint: string
    agree_statement: string
    field_empty_error: string
    email_format_error: string
    password_not_match_error: string
    weak_password_error: string
    email_used_error: string
    username_used_error: string
    did_not_agree_error: string
}

export let SignUpLocalizationStrings: ISignUpLocalizationStrings
SignUpLocalizationStrings = new LocalizedStrings({
    en: {
        username: "Nick Name",
        username_hint: "Your Nick Name",
        password: "Password",
        confirm_password: "Confirm Password",
        sign_up: "Register",
        sign_in: "Sign in",
        email: "School Email Adress",
        email_hint: "Your School Email",
        agree_statement: "I agree that there is nothing to agree.",
        field_empty_error: "* This feild is required!",
        email_format_error: "* Invalid email!",
        password_not_match_error: "* The passwords do not match!",
        weak_password_error: "* The password is too weak!",
        email_used_error: "* This email has been registered!",
        username_used_error: "* The username has been taken!",
        did_not_agree_error: "* This has to be checked!"
    },
    // zh: {
    //     password: "密碼",
    //     sign_up: "註冊帳號",
    //     sign_in: "登入",
    //     email: "電郵",
    // },
})