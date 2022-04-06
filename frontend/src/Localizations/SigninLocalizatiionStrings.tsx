import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"

export interface ISignInLocalizationStrings extends LocalizedStringsMethods {

    password: string
    forgot_password: string
    sign_up: string
    remember_me: string
    email: string
    sign_in: string
    signing_in: string
    incorrect_info_error: string
    field_empty_error: string
    server_unavailable_error: string
}

export let SigninLocalizatiionStrings: ISignInLocalizationStrings
SigninLocalizatiionStrings = new LocalizedStrings({
    en: {
        password: "Password",
        forgot_password: "Forgot password?",
        sign_up: "Sign up",
        sign_in: "Sign in",
        email: "Email Adress",
        remember_me: "Remember me",
        signing_in: "Loggin in . . . ",
        incorrect_info_error: "Incorrect email or password!",
        field_empty_error: "* This feild is required!",
        server_unavailable_error: "Sorry! The server is current down for maintainance!",
    },
    // zh: {
    //     password: "密碼",
    //     forgot_password: "忘記密碼",
    //     sign_up: "註冊帳號",
    //     sign_in: "登入",
    //     email: "電郵",
    //     remember_me: "記住我",
    //     signing_in: "登入中．．．"
    // },
})