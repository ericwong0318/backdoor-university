import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"

export interface IHeaderLocalizationStrings extends LocalizedStringsMethods {
    home: string,
    tips: string,
    news: string,
    programme: string,
    statistics: string,
    games: string,
    search: string
    login: string,
    logout: string,
    register: string,
    profile: string,
    dashboard: string,
    language: string,
    zh: string,
    en: string
}

export let HeaderLocalizationStrings: IHeaderLocalizationStrings
HeaderLocalizationStrings = new LocalizedStrings({
    en: {
        home: "Home",
        tips: "Tips",
        news: "News",
        programme: "Programme Catalog",
        statistics: "Statistics",
        search: "Search Programme",
        games: "Games",
        login: "Login",
        logout: "Logout",
        register: "Register",
        profile: "Profile",
        dashboard: "Dashboard",
        language: "Language",
        zh: "Traditional Chinese",
        en: "English"
    },
    // zh: {
    //     home: "主頁",
    //     tips: "提示",
    //     news: "最新資訊",
    //     programmeCatalog: "課程資訊",
    //     statistics: "收生數據",
    //     login: "登入",
    //     register: "註冊",
    //     language: "語言",
    //     zh: "繁體中文",
    //     en: "英文"
    // }
})