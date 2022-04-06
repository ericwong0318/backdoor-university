import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"

export interface IForgotPasswordLocalizationStrings extends LocalizedStringsMethods {
    forgot_password: string
    reset_password: string
    email: string
    hint: string
    wait: string
    submit: string
    field_empty_error: string
    success: string
}

export let ForgotPasswordLocalizationStrings: IForgotPasswordLocalizationStrings;
ForgotPasswordLocalizationStrings = new LocalizedStrings(
    {
        en: {
            forgot_password: "Forgot Password",
            reset_password: "Reset Password",
            email: "Email",
            hint: "Enter your email to reset your password",
            wait: "Please wait . . . ",
            submit: "Submit",
            field_empty_error: "* This feild is required!",
            success: "Please check your email to reset your password."
        }
    })