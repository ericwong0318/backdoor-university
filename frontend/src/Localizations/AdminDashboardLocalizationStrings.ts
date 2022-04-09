import LocalizedStrings, { LocalizedStringsMethods } from "react-localization"

export interface IAdminDashboardLocalizationStrings extends LocalizedStringsMethods {
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
}

export let AdminDashboardLocalizationStrings: IAdminDashboardLocalizationStrings;
AdminDashboardLocalizationStrings = new LocalizedStrings(
    {
        en: {
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
        }
    })