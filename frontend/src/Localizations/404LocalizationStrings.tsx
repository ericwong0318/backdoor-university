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
        }
    })