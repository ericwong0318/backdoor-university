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
    server_unavailable_error: string
    email_unregistered_error: string
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
            server_unavailable_error: "Sorry! The server is current down for maintainance!",
            email_unregistered_error: "This email has not been registered!",
        }
        /* zh: {
            forgot_password: "忘記密碼",
            reset_password: "重置密碼",
            email: "電郵地址",
            hint: "請輸入你的電郵地址以重置密碼",
            wait: "請稍候片刻 . . .",
            submit: "提交",
            field_empty_error: "* 必須填寫！",
            success: "成功",
            success_message: "請檢查你的電子郵箱以重置密碼！",
            back_to_login: "返回登入頁",
            no_account_error: "這個電郵尚未登記！",
            invalid_email_format_error: "無效電郵地址",
            server_unavailable_error: "對不起！伺服器暫時停止運作以供維收！",
            email_unregistered_error: "這個電郵尚未登記！",
        } */
    })