import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"

export interface IHeaderLocalizationStrings extends LocalizedStringsMethods {
    home: string,
    // Placeholder namings. Waiting to be changed
    bt1: string,
    btn2: string,
    btn3: string,
    language: string,
    zh: string,
    en: string
}

export let headerLocalizationStrings: IHeaderLocalizationStrings
headerLocalizationStrings = new LocalizedStrings({
    en: {
        home: "Home",
        // Placeholder namings. Waiting to be changed
        bt1: "btn",
        btn2: "btn",
        btn3: "btn",
        language: "Language",
        zh: "Traditional Chinese",
        en: "English"
    },
    zh: {
        home: "主頁",
        // Placeholder namings. Waiting to be changed
        bt1: "btn",
        btn2: "btn",
        btn3: "btn",
        language: "語言",
        zh: "繁體中文",
        en: "英文"
    }
})