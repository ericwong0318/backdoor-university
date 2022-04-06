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
    success_message: string
    back_to_login: string
    no_account_error: string
    invalid_email_format_error: string
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
            success: "Success",
            success_message: "Please check your email to reset your password!",
            back_to_login: "Back to login",
            no_account_error: "This email has not been registered!",
            invalid_email_format_error: "Invalid email!",
        }
    })