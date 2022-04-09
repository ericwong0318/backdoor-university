import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"

export interface IHeaderLocalizationStrings extends LocalizedStringsMethods {
    home: string,
    tips: string,
    news: string,
    programme: string,
    statistics: string,
    search: string
    login: string,
    logout: string,
    register: string,
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
        login: "Login",
        logout: "Logout",
        register: "Register",
        language: "Language",
        zh: "Traditional Chinese",
        en: "English"
    },
    // zh: {
    //     home: "主頁",
    //     tips: string,
    //     news: string,
    //     programmeCatalog: string,
    //     statistics: string,
    //     login: string,
    //     register: string,
    //     language: "語言",
    //     zh: "繁體中文",
    //     en: "英文"
    // }
})