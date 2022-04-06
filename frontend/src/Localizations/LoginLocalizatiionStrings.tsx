import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"

export interface ILoginLocalizationStrings extends LocalizedStringsMethods {

    password: string
    forgot_password: string
    register: string
    remember_me: string
    email: string
    login: string
    loging_in: string
    incorrect_info_error: string
    field_empty_error: string
    server_unavailable_error: string
}

export let LoginLocalizatiionStrings: ILoginLocalizationStrings
LoginLocalizatiionStrings = new LocalizedStrings({
    en: {
        password: "Password",
        forgot_password: "Forgot password?",
        register: "Register",
        login: "Login",
        email: "Email Adress",
        remember_me: "Remember me",
        loging_in: "Loggin in . . . ",
        incorrect_info_error: "Incorrect email or password!",
        field_empty_error: "* This feild is required!",
        server_unavailable_error: "Sorry! The server is current down for maintainance!",
    },
    // zh: {
    //     password: "密碼",
    //     forgot_password: "忘記密碼",
    //     register: "註冊帳號",
    //     login: "登入",
    //     email: "電郵",
    //     remember_me: "記住我",
    //     loging_in: "登入中．．．"
    // },
})