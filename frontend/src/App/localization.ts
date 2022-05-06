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
    reset_pw_success_message: string
    back_to_login: string
    no_account_error: string
    invalid_email_format_error: string
    server_unavailable_error: string
    email_unregistered_error: string

    /* Header */
    home: string,
    tips: string,
    news: string,
    programme_cat: string,
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
    user_not_found: string,

    // Profile info headers
    avatar: string,

    // Programme info headers
    prog_name: string,
    prog_type: string,
    prog_info: string,
    subjects: string,
    interviews: string,
    programme: string,
    status: string,

    // Fixed info
    undergrad: string,
    asso: string,
    hd: string,
    you_no_offer: string,
    user_has_no_offer: string,
    unverified: string,
    active: string,
    banned: string,
    profile_changed: string,

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
    get_user_error: string,
    get_programme_error: string,


    // ProgrammePage
    ProgrammePage_Title: String,
    choose_programme_guide: String,
    hku_name: String,
    cuhk_name: String,
    ust_name: String,
    cityu_name: String,
    polyu_name: String,
    edu_name: String,
    hsu_name: String,
    cuhk_ai: String,
    cuhk_ce: String,
    cuhk_cs: String,
    hku_civil: String,
    hku_mech: String,
    hku_eee: String,
    ust_civil: String,
    ust_chem: String,
    ust_mech: String,
    lingu_name: String,
    hkmu_name: String,
    hkbu_name: String,

    // StatisticsPage
    StatisticsPage_Title: String,
    SpecProgPage_Title: String,
    comment: String,
    UniProgramme: String,
    CCProgramme: String,
    CC: String,
    Uni: String,
    totalOffer: String,
    otherCC: String,


    //HomePage
    wel_1speech: String
    wel_2speech: String
    hm_title: String
    hm_tips: String
    hm_tips_content: String
    click_here: String
    hm_dl: String
    hm_dl_content: String

    //NewsPage
    cuhk_early: String
    cuhk_main: String
    cuhk_extend: String
    ust_early: String
    ust_main: String
    ust_extend: String
    hku_early: String
    hku_main: String
    hku_extend: String
    cityu_early: String
    cityu_main: String
    cityu_extend: String
    polyu_early: String
    polyu_main: String
    polyu_extend: String
    edu_early: String
    edu_main: String
    edu_extend: String
    hsu_early: String
    hsu_main: String
    hsu_extend: String
    lingu_early: String
    lingu_main: String
    lingu_extend: String
    hkmu_early: String
    hkmu_main: String
    hkmu_extend: String
    hkbu_early: String
    hkbu_main: String
    hkbu_extend: String
    apply_now: String

    //TipsPage
    go_to: String
    title1: String
    title2: String
    title3: String
    title4: String
    title5: String
    title6: String
    title7: String
    title8: String
    uni_int: String
    content1: String
    content2: String
    content3: String
    content4: String
    content5: String
    content6: String
    content7: String
    content8: String

    // Admin
    edit_user: string
    add_new_programme: string,
    activate_account: string,
    account_activated: string,
    edit_prog: string,
    add_prog: string,
    prog_update_success_msg: string,

    // Account Activation
    account_activated_msg: string
    please_wait: string

    // Comment
    add_comment: string
    your_comment_offer: string,
    comment_here: string,
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
            user_not_found: "No user found",
            status: "Status",
            unverified: "Unverified",
            active: "Active",
            banned: "Banned",


            /* Forgot Password */
            forgot_password: "Forgot Password",
            hint: "Enter your email to reset your password",
            wait: "Please wait . . . ",
            submit: "Submit",
            success: "Success",
            reset_pw_success_message: "Please check your email to reset your password!",
            back_to_login: "Back to login",
            no_account_error: "This email has not been registered!",
            invalid_email_format_error: "Invalid email!",
            email_unregistered_error: "This email has not been registered!",

            /* Header */
            home: "Home",
            tips: "Tips",
            news: "News",
            programme_cat: "Programme Catalog",
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
            programme: 'Programme',


            // Fixed info
            undergrad: 'Undergraduate',
            asso: 'Associate degree',
            hd: 'Higher Diploma',
            you_no_offer: 'You have no offer yet',
            user_has_no_offer: "This user don't have any offer yet.",
            profile_changed: "Profile changes saved!",

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
            get_user_error: "Error loading users",
            get_programme_error: "Error loading programmes",

            // ProgrammePage
            ProgrammePage_Title: "Non-JUPAS Programmes",
            choose_programme_guide: "Choose a programme to check the specfic statistics",
            hku_name: "The University of Hong Kong (HKU)",
            cuhk_name: "The Chinese University of Hong Kong (CUHK)",
            ust_name: "The Hong Kong University of Science and Technology (UST)",
            cityu_name: "The City University of Hong Kong (CityU)",
            polyu_name: "The Hong Kong Polytechnic University (PolyU)",
            edu_name: "The Education University of Hong Kong (EdU)",
            hsu_name: "The Hang Seng University of Hong Kong (HSU)",
            lingu_name: "Lingnan University (LingU)",
            hkmu_name: "Hong Kong Metropolitan University (HKMU)",
            hkbu_name: "Hong Kong Baptist University (HKBU",

            cuhk_ai: "Artificial Intelligence",
            cuhk_ce: "Computer Engineering",
            cuhk_cs: "Computer Science",

            hku_civil: "Civil Engineering",
            hku_eee: "Electrical Engineering",
            hku_mech: "Mechanical Engineering",

            ust_civil: "Civil Engineering",
            ust_chem: "Chemical Engineering",
            ust_mech: "Mechanical Engineering",

            // StatisticsPage
            StatisticsPage_Title: "General non-JUPAS Admission Statistics",
            SpecProgPage_Title: "Non-JUPAS Admission Statistics",
            comment: "Comment",
            UniProgramme: "Uni Programme",
            CCProgramme: "CC Programme",
            CC: "CC",
            Uni: "Uni",
            totalOffer: "Total Non-JUPAS Offer",
            otherCC: "other",

            //HomePage
            wel_1speech: "Welcome! All the Non-Jupas student",
            wel_2speech: "Here, we provide all the information you need!",
            hm_title: "Things You Have to Know",
            hm_tips: "Interview Tips",
            hm_tips_content: "Have you got a oppotunity of interview, and are now feeling nervous and wondering how to prepare?",
            click_here: "Click here for more information",
            hm_dl: "Application Deadline",
            hm_dl_content: "Remember to apply the non jupas application before the deadline",

            //NewsPage
            cuhk_early: "Early Round Deadline: 17-11-2022",
            cuhk_main: "Regular Round Deadline: 06-01-2022",
            cuhk_extend: "Extended Application Deadline: 31-05-2022",
            ust_early: "Early Round Deadline: 19-11-2021",
            ust_main: "Regular Round Deadline: 14-01-2022",
            ust_extend: "Extended Application Deadline: N/A",
            hku_early: "Early Round Deadline: 17-11-2022",
            hku_main: "Regular Round Deadline: 24-08-2022",
            hku_extend: "Extended Application Deadline: N/A",
            cityu_early: "Early Round Deadline: 15-11-2021",
            cityu_main: "Regular Round Deadline: 13-01-2022",
            cityu_extend: "Extended Application Deadline: N/A",
            polyu_early: "Early Round Deadline: 17-11-2022",
            polyu_main: "Regular Round Deadline: 06-01-2022",
            polyu_extend: "Extended Application Deadline: 31-05-2022",
            edu_early: "Early Round Deadline: 12-01-2022",
            edu_main: "Regular Round Deadline: 12-05-2022",
            edu_extend: "Extended Application Deadline: N/A",
            hsu_early: "Early Round Deadline: N/A",
            hsu_main: "Regular Round Deadline: 08-08-2022",
            hsu_extend: "Extended Application Deadline: N/A",
            lingu_early: "Early Round Deadline: 07-12-2021",
            lingu_main: "Regular Round Deadline: 17-05-2022",
            lingu_extend: "Extended Application Deadline: 28-07-2022",
            hkmu_early: "Early Round Deadline: 31-05-2022",
            hkmu_main: "Regular Round Deadline: 05-05-2022",
            hkmu_extend: "Extended Application Deadline: N/A",
            hkbu_early: "Early Round Deadline: N/A",
            hkbu_main: "Regular Round Deadline: 04-01-2022",
            hkbu_extend: "Extended Application Deadline: 31-05-2022",
            apply_now: "Apply Now",

            //TipsPage
            go_to: "Go to",
            title1: "-How to prepare for a university interview",
            title2: "-Practice answers to common questions",
            title3: "-Re-read your personal statement",
            title4: "-Make sure you can attend",
            title5: "-Remember to bring any additional documents",
            title6: "-Arrive early",
            title7: "-Dress smartly",
            uni_int: "University Interview",
            title8: "-Prepare your own questions in advance",
            content1: "Being asked to attend an interview is the mark of an excellent application but remember that you'll be competing against other strong candidates. So, it's important to prepare well. These university interview tips listed below will help increase your chances of success.",
            content2: "Most interview will ask 'Why do you want to study the subject?' and 'Why do you want to go to this university?'. Prepare the response to these question well , better memorize and polish it before the interview, but need to speak naturally and not like scripted.",
            content3: "You might be asked about some of the things you included, so make sure you familiarise yourself with what you wrote. Double check the personal statement to ensure that there is no any mistakes.",
            content4: "If you're not able to attend the interview, contact the interview for rearrangement. Don't cancel it at the last minutes which give give the interviewee a bad images.",
            content5: "You might be asked to bring a portfolio of your work if you’re applying for a creative arts course. Check this well in advance, as much of your interview may be focused on this work.",
            content6: "If your interview is in face-to-face, arrive the campus half hour before the interview as you may get lost. Also, it allows you to have some time to get ready and familiarise yourself with the location and avoid adding any unnecessary stress. If you’re doing a virtual interview, ensure that the wifi connection is strong and all the communication devices are well functioned.",
            content7: "Looking clean and tidy will ensure that you leave a good impression. For business programme, you may need to dress formal. For others, you may be ask to dress smart causal.",
            content8: "When the interview is finished, you may have the chance to ask some question. Make sure that you have prepared the questions to show your interest to the programme.",

            // Admin
            edit_user: "Edit User",
            add_new_programme: "Add new programme",
            activate_account: "Activate Account",
            account_activated: "Account activated",
            edit_prog: "Edit Programme",
            add_prog: "Add Programme",
            prog_update_success_msg: "Changes saved",

            // Account Activation
            account_activated_msg: "Your account has been successfully activated!",
            please_wait: "Please wait. . . ",

            // Comment
            add_comment: 'Add comment',
            your_comment_offer: 'Your comment of the offer',
            comment_here: 'Comment here',
        },
        zh: {
            //404 done
            not_found_header: "404 找不到",
            not_found_message: "這個頁面並不存在",
            back_to_home: "返回主頁",

            // Admin Dashboard 
            // Side menu 
            my_profile: "我的個人檔案",
            users: "用戶",
            programmes: "課程",
            reports: "報告",
            comments: "評論",

            //My Profile & User
            email: "電郵",
            reset_password: "重置密碼",
            search: "搜尋",
            name: "姓名",
            school: "學校",
            user_not_found: "用戶不存在",
            status: "帳戶狀態",
            unverified: "未驗證",
            active: "啟用中",
            banned: "停權",


            //Forget Password
            forgot_password: "忘記密碼",
            hint: "請輸入你的電郵地址以重置密碼",
            wait: "請稍候片刻 . . .",
            submit: "提交",
            success: "成功",
            reset_pw_success_message: "請檢查你的電子郵箱以重置密碼！",
            back_to_login: "返回登入頁",
            no_account_error: "這個電郵尚未登記！",
            invalid_email_format_error: "無效電郵地址",
            email_unregistered_error: "這個電郵尚未登記！",

            //header
            home: "主頁",
            tips: "提示",
            news: "最新資訊",
            programme_cat: "課程資訊",
            statistics: "收生數據",
            search_prog: "搜尋課程",
            games: "遊戲",
            login: "登入",
            logout: "登出",
            register: "註冊",
            language: "語言",
            profile: "個人檔案",
            dashboard: "儀錶板",
            zh: "繁體中文",
            en: "英文",

            //Login
            password: "密碼",
            forgot_password_login: "忘記密碼？",
            email_adress: "電郵地址",
            remember_me: "記住我",
            loging_in: "登入中 . . . ",
            incorrect_info_error: "電郵地址或密碼不正確！",
            field_empty_error: "* 必須填寫！",
            server_unavailable_error: "對不起！伺服器暫時停止運作以供維修！",

            // Register 
            username: "用戶名稱",
            username_hint: "你的用戶名稱",
            confirm_password: "確認密碼",
            curr_school: "在讀學校",
            curr_programme: "現時課程",
            cgpa: "現時 CGPA",
            exam_name: "考試",
            exam_result: "考試成績",
            school_email: "學校電郵",
            email_hint: "你的學校電郵",
            agree_statement: "我甚麼都同意，因為我甚麼都無須同意",
            email_format_error: "* 無效電郵地址",
            password_not_match_error: "* 密碼不正確！",
            weak_password_error: "* 密碼強度不足！",
            email_used_error: "* 這個電郵已註冊！",
            username_used_error: "* 用戶名稱已被使用！",
            did_not_agree_error: "* 這項必須同意",
            registering: "正在註冊 . . . ",
            register_success_message: "請檢查您的電子郵箱，以驗證您的電子郵件地址，包括垃圾郵件！",
            choose_photo: "請選擇一張相片...",
            no_file_error: "請上傳一張個人相片！",
            admission_year: "入學年",
            file_size_error: "最大容量 2MB!",

            // User Profile
            // Headers
            curr_prog: '現時課程',
            offers: '取錄條件',

            // Profile info headers
            avatar: '個人檔案相片',

            // Programme info headers
            prog_name: '課程名稱',
            prog_type: '類型',
            prog_info: '資料',
            subjects: '科目',
            interviews: '面試',
            programme: '課程',


            // Fixed info
            undergrad: '學士',
            asso: '副學士',
            hd: '高級文憑',
            you_no_offer: '你尚未有任何錄取記錄',
            user_has_no_offer: "此用戶未有任何錄取記錄",
            profile_changed: "變更已被儲存！",


            // Features
            edit: '編輯',
            edit_profile: '編輯個人檔案',
            change_password: '更改密碼',
            change_avatar: '編輯個人相片',
            cancel: "取消",
            save: "儲存",
            old_password: "舊密碼",
            new_password: "新密碼",
            confirm: "確認",
            change_pw_success: "密碼已變更！",
            opps: "有些東西錯了！",

            // Errors
            old_pw_incorrect_error: "舊密碼錯誤！",
            new_pw_too_weak_error: "密碼強度不足！",
            new_old_pw_same_error: "新密碼與薺密碼不能相同！",
            get_user_error: "未能取得用戶資料",
            get_programme_error: "未能取得課程資料",

            // ProgrammePage
            ProgrammePage_Title: "非大學聯合招生課程",
            choose_programme_guide: "請選擇課程查看收生數據",
            hku_name: "香港大學 (HKU)",
            cuhk_name: "香港中文大學 (CUHK)",
            ust_name: "香港科技大學 (UST)",
            cityu_name: "香港城市大學 (CityU)",
            polyu_name: "香港理工大學 (PolyU)",
            edu_name: "香港教育大學 (EdU)",
            hsu_name: "香港恒生大學 (HSU)",
            lingu_name: "香港嶺南大學 (LingU)",
            hkmu_name: "香港都會大學 (HKMU)",
            hkbu_name: "香港浸會大學 (HKBU",

            cuhk_ai: "人工智能",
            cuhk_ce: "計算機工程學",
            cuhk_cs: "計算機科學",

            hku_civil: "土木工程學",
            hku_eee: "電機工程學",
            hku_mech: "機械工程學",

            ust_civil: "土木工程學",
            ust_chem: "化學工程學",
            ust_mech: "機械工程學",

            // StatisticsPage
            StatisticsPage_Title: "非聯招收生 總體數據",
            SpecProgPage_Title: "非聯招收生數據",
            comment: "留言",
            UniProgramme: "大學課程",
            CCProgramme: "大專課程",
            CC: "大專",
            Uni: "大學",
            totalOffer: "非聯招錄取總數",
            otherCC: "其他",

            //HomePage
            wel_1speech: "歡迎各位non-Jupas的同學",
            wel_2speech: "這裹，提供了你所需的一切資訊",
            hm_title: "需知",
            hm_tips: "面試技巧",
            hm_tips_content: "收到面試通知後是否感到有些手足無措？",
            click_here: "點擊這裡以獲取更多資訊",
            hm_dl: "報名期限",
            hm_dl_content: "記得在限期前提交申請！",

            //NewsPage
            cuhk_early: "第一輪申請期限: 17-11-2021",
            cuhk_main: "正常申請期限: 06-01-2022",
            cuhk_extend: "延長申請期限: 31-05-2022",
            ust_early: "第一輪申請期限: 19-11-2021",
            ust_main: "正常申請期限: 14-01-2022",
            ust_extend: "延長申請期限: N/A",
            hku_early: "第一輪申請期限: 17-11-2022",
            hku_main: "正常申請期限: 24-08-2022",
            hku_extend: "延長申請期限: N/A",
            cityu_early: "第一輪申請期限: 15-11-2021",
            cityu_main: "正常申請期限: 13-01-2022",
            cityu_extend: "延長申請期限: N/A",
            polyu_early: "第一輪申請期限: 17-11-2022",
            polyu_main: "正常申請期限: 06-01-2022",
            polyu_extend: "延長申請期限: 31-05-2022",
            edu_early: "第一輪申請期限: 12-01-2022",
            edu_main: "正常申請期限: 12-05-2022",
            edu_extend: "延長申請期限: N/A",
            hsu_early: "第一輪申請期限: N/A",
            hsu_main: "正常申請期限: 08-08-2022",
            hsu_extend: "延長申請期限: N/A",
            lingu_early: "第一輪申請期限: 07-12-2021",
            lingu_main: "正常申請期限: 17-05-2022",
            lingu_extend: "延長申請期限: 28-07-2022",
            hkmu_early: "第一輪申請期限: 31-05-2022",
            hkmu_main: "正常申請期限: 05-05-2022",
            hkmu_extend: "延長申請期限: N/A",
            hkbu_early: "第一輪申請期限: N/A",
            hkbu_main: "正常申請期限: 04-01-2022",
            hkbu_extend: "延長申請期限: 31-05-2022",
            apply_now: "現在報名",

            //TipsPage
            go_to: "去",
            title1: "-怎樣準備大學面試？",
            title2: "-預先準備常見的面試提目",
            title3: "-重新讀一次個人陳述(personal statement)",
            title4: "-確保你能夠準時出席",
            title5: "-記得帶齊文件",
            title6: "-提早到達面試地點",
            title7: "-衣著要整齊",
            title8: "-準備好要問的問題",
            uni_int: "大學面試",
            content1: "收到面試通知只是第一步，接下來你將會面對的都是強勁的對手，所以一定要預先準備好。以下的面試需知將會提升你成功的機會。",
            content2: "面試通常都會遇到一些常見問題，例如:「為什麼你會選譯讀這個科目？」、「為什麼你想入這間大學？」。預先準備這些問題的回應，並且要練到十分流暢，聽落去要很自然，不像背誦。",
            content3: "面試官有可能會問一些問題關於你的個人陳述，所以要熟識入面的內容，並確保沒有任何的錯誤。",
            content4: "如果你未能夠出席面試，請提早通知以更改面試日期。千萬不要去到最後一刻才通知，會給面試官一個不良印象。.",
            content5: "如果你是面試的是藝術科目，請帶同你的作品集出席。",
            content6: "如果你的面試是實體型式，請提早抵達面試地點，熟悉一下環境，放鬆心情，並提防迷路。如果是線上型式的面試，檢查一下網絡及語音設備，確保不會突然斷線。",
            content7: "穿著整齊的服裝，並跟據面試要求穿著相應的服飾。如面試商科，就要穿著整套西裝。",
            content8: "當面試完成後，面試官會給予你問問題的機會。請提早準備好要問的問題，顯出你對該科目的濃厚興趣。.",

            // Admin
            edit_user: "修改用戶資料",
            add_new_programme: "新增課程",
            activate_account: "啟用帳戶",
            account_activated: "帳戶已被啟用",
            edit_prog: "修改課程",
            add_prog: "新增課程",
            prog_update_success_msg: "課程資訊已更新",

            // Account Activation
            account_activated_msg: "帳戶啟用成功！",
            please_wait: "請稍候．．．",

            // Comment
            add_comment: '提交評論',
            your_comment_offer: '課程評價',
            comment_here: '輸入評價',
        }
    })
