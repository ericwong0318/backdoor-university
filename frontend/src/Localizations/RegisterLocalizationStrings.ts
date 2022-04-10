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
    admission_year: string,
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
    file_size_error: string
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
        admission_year: "Admission Year",
        file_size_error: "The maximum size is 2MB!",
    },
    /* zh: {
        username: "用戶名稱",
        username_hint: "你的用戶名稱",
        password: "密碼",
        confirm_password: "確認密碼",
        school: "在讀學校",
        programme: "現時課程",
        cgpa: "現時 CGPA",
        exam_name: "Taken Exam Name",
        exam_result: "考試成績",
        register: "註冊帳號",
        login: "登入",
        email: "學校電郵",
        email_hint: "你的學校電郵",
        agree_statement: "我甚麼都同意，因為我甚麼都無須同意",
        field_empty_error: "* 必須填寫！",
        email_format_error: "* 無效電郵地址",
        password_not_match_error: "* 密碼不正確！",
        weak_password_error: "* 密碼太弱！",
        email_used_error: "* 這個電郵尚未註冊！",
        username_used_error: "* 用戶名稱已被使用！",
        did_not_agree_error: "* 這項必須同意",
        registering: "正在註冊 . . . ",
        server_unavailable_error: "對不起！伺服器暫時停止運作以供維護！",
        success: "成功",
        success_message: "請確認你的電子郵箱",
        back_to_login: "返回登入頁",
        choose_photo: "請選擇一張相片...",
        no_file_error: "請上傳一張個人相片！",
        admission_year: "入學年",
        file_size_error: "最大容量 2MB!",
    }, */
})