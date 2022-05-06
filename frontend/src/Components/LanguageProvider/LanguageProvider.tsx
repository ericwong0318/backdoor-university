/*
    This file contained the definition of the <LanguageProvider/>
    and the implementation of the LanguageContext.

    The <LanguageProvider/> allows any child component to dynamically switch between different languages. 
    To enable localization in a child component, import this file and call useContext(LanguageContext).
    The useContext(LanguageContext) can be destructed into the following objects:
    - language:
        The current displayed interface language. Read only.
    
    - setLanguage(code: string): void
        Set the curremt displayed interface language.

    - localString: AppLocalizedStrings
        The object that contains all the texts defined in localization.ts.

    Example:
        To create a component that displays the login text and are able to dynamically
        change according to the selected language:
    
        const ExampleComponent = () => {
            const { localString } = useContext(LanguageContext);

            return <div> {localString.login} </div>
        }
*/

import React, { useState } from 'react'
import { AppLocalizedStrings } from '../../App/localization'

export const LanguageContext = React.createContext({
    language: AppLocalizedStrings.getLanguage(),
    setLanguage: (code: string) => { },
    localString: AppLocalizedStrings
})

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLan] = useState(AppLocalizedStrings.getLanguage())

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