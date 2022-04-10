import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"

export interface INotFoundLocalizationStrings extends LocalizedStringsMethods {
    back_to_home: string
    not_found_header: string
    not_found_message: string
}

export let NotFoundLocalizationStrings: INotFoundLocalizationStrings;
NotFoundLocalizationStrings = new LocalizedStrings(
    {
        en: {
            not_found_header: "404 Not Found",
            not_found_message: "The page your are looking for does not exist.",
            back_to_home: "Go back to home",
        },
        /* zh: {
            not_found_header: "404 找不到",
            not_found_message: "這個頁面並不存在",
            back_to_home: "返回主頁",
        } */
    })