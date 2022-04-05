import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"

export interface ISignUpLocalizationStrings extends LocalizedStringsMethods {

    password: string
    sign_up: string
    email: string
    sign_in: string
}

export let SignUpLocalizatiionStrings: ISignUpLocalizationStrings
SignUpLocalizatiionStrings = new LocalizedStrings({
    en: {
        password: "Password",
        forgot_password: "Forgot password?",
        sign_up: "Sign up",
        sign_in: "Sign in",
        email: "Email Adress",
        remember_me: "Remember me",
    },
    // zh: {
    //     password: "密碼",
    //     sign_up: "註冊帳號",
    //     sign_in: "登入",
    //     email: "電郵",
    // },
})