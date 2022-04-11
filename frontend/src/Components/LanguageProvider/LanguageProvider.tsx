import React, { useState } from 'react'
import { AppLocalizedStrings } from '../../App/localization'

export const LanguageContext = React.createContext({
    language: AppLocalizedStrings.getInterfaceLanguage(),
    setLanguage: (code: string) => { },
    localString: AppLocalizedStrings
})

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLan] = useState(AppLocalizedStrings.getInterfaceLanguage())

    const localString = AppLocalizedStrings;

    const setLanguage = (code: string) => {
        AppLocalizedStrings.setLanguage(code);
        setLan(code);
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, localString }}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageProvider;