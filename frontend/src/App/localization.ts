import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"


export interface IAppLocalizedStrings extends LocalizedStringsMethods {
    /* 404 */
    back_to_home: string
    not_found_header: string
    not_found_message: string

    /* Admin Dashboard */
    // Side menu
    my_profile: string,
    users: string,
    programmes: string,
    reports: string,
    comments: string,

    // My profile & Users
    email: string,
    reset_password: string,
    search: string,
    name: string,
    school: string,

    /* Forgot password */
    forgot_password: string
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

    /* Header */
    home: string,
    tips: string,
    news: string,
    programme: string,
    statistics: string,
    games: string,
    search_prog: string
    login: string,
    logout: string,
    register: string,
    profile: string,
    dashboard: string,
    language: string,
    zh: string,
    en: string

    /* Login */
    email_adress: string
    password: string
    remember_me: string
    forgot_password_login: string
    loging_in: string
    incorrect_info_error: string

    /* Register */
    username: string
    username_hint: string
    confirm_password: string
    curr_school: string
    curr_programme: string
    cgpa: string
    exam_name: string
    exam_result: string
    email_hint: string
    agree_statement: string
    admission_year: string,
    email_format_error: string
    password_not_match_error: string
    weak_password_error: string
    email_used_error: string
    username_used_error: string
    did_not_agree_error: string
    registering: string
    register_success_message: string
    choose_photo: string
    no_file_error: string
    file_size_error: string

    /* User Profile */
    // Headers
    curr_prog: string,
    offers: string,

    // Profile info headers
    avatar: string,

    // Programme info headers
    prog_name: string,
    prog_type: string,
    prog_info: string,
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

    // Errors
    old_pw_incorrect_error: string,
    new_pw_too_weak_error: string,
    new_old_pw_same_error: string,
}

export const AppLocalizedStrings: IAppLocalizedStrings = new LocalizedStrings(
    {
        en: {
            /* 404 */
            not_found_header: "404 Not Found",
            not_found_message: "The page your are looking for does not exist.",
            back_to_home: "Go back to home",


            /* Admin Dashboard */
            // Side menu
            my_profile: "My Profile",
            users: "Users",
            programmes: "Programmes",
            reports: "Reports",
            comments: "Comments",

            // My profile & Users
            email: "Email",
            reset_password: "Reset Password",
            search: "Search",
            name: "Name",
            school: "School",

            /* Forgot Password */
            forgot_password: "Forgot Password",
            hint: "Enter your email to reset your password",
            wait: "Please wait . . . ",
            submit: "Submit",
            success: "Success",
            success_message: "Please check your email to reset your password!",
            back_to_login: "Back to login",
            no_account_error: "This email has not been registered!",
            invalid_email_format_error: "Invalid email!",
            email_unregistered_error: "This email has not been registered!",

            /* Header */
            home: "Home",
            tips: "Tips",
            news: "News",
            programme: "Programme Catalog",
            statistics: "Statistics",
            search_prog: "Search Programme",
            games: "Games",
            login: "Login",
            logout: "Logout",
            register: "Register",
            profile: "Profile",
            dashboard: "Dashboard",
            language: "Language",
            zh: "Traditional Chinese",
            en: "English",

            /* Login */
            password: "Password",
            forgot_password_login: "Forgot password?",
            email_adress: "Email Adress",
            remember_me: "Remember me",
            loging_in: "Loggin in . . . ",
            incorrect_info_error: "Incorrect email or password!",
            field_empty_error: "* This feild is required!",
            server_unavailable_error: "Sorry! The server is currently down for maintainance!",

            /* Register */
            username: "Nick Name",
            username_hint: "Your Nick Name",
            confirm_password: "Confirm Password",
            curr_school: "Current School",
            curr_programme: "Current Study Programme",
            cgpa: "Current CGPA",
            exam_name: "Taken Exam Name",
            exam_result: "Exam Result",
            school_email: "School Email Adress",
            email_hint: "Your School Email",
            agree_statement: "I agree that there is nothing to agree.",
            email_format_error: "* Invalid email!",
            password_not_match_error: "* The passwords do not match!",
            weak_password_error: "* The password is too weak!",
            email_used_error: "* This email has been registered!",
            username_used_error: "* The username has been taken!",
            did_not_agree_error: "* This has to be checked!",
            registering: "Registering . . . ",
            register_success_message: "Please check the veriftication email, including spam folder!",
            choose_photo: "Choose a photo...",
            no_file_error: "Please upload a profile picture!",
            admission_year: "Admission Year",
            file_size_error: "The maximum size is 2MB!",

            /* User Profile */
            // Headers
            curr_prog: 'Current Programme',
            offers: 'Offers',

            // Profile info headers
            avatar: 'Profile Picture',

            // Programme info headers
            prog_name: 'Programme Name',
            prog_type: 'Type',
            prog_info: 'Info',
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
            new_old_pw_same_error: "The new password and the old password cannot be the same!",
        },
        /* zh: {
            not_found_header: "404 找不到",
            not_found_message: "這個頁面並不存在",
            back_to_home: "返回主頁",

            
            
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
            server_unavailable_error: "對不起！伺服器暫時停止運作以供維修！",
            email_unregistered_error: "這個電郵尚未登記！",

            
        home: "主頁",
        tips: "提示",
        news: "最新資訊",
        programmeCatalog: "課程資訊",
        statistics: "收生數據",
        login: "登入",
        register: "註冊",
        language: "語言",
        zh: "繁體中文",
        en: "英文",

        // Register 
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
        } */
    })