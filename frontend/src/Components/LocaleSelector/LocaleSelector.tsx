import React, { useContext, useEffect, useState } from 'react'
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import LocalizedStrings from 'react-localization';
import { AppLocalizedStrings } from '../../App/localization';
import { MenuItem } from '@mui/material';
import { LanguageContext } from '../LanguageProvider/LanguageProvider';

interface ILocaleSelectorProps extends SelectProps {
}

const getTranslatedLanCode = (code: string) => {
    switch (code) {
        case 'en':
            return AppLocalizedStrings.en;

        case 'zh':
            return AppLocalizedStrings.zh;
    }
}

const LocaleSelector = (props: ILocaleSelectorProps) => {
    const lanOpts = AppLocalizedStrings.getAvailableLanguages()
    let defaultLan = lanOpts[0];

    if (localStorage.getItem('backdoor-university-pref-lan')) {
        defaultLan = localStorage.getItem('backdoor-university-pref-lan')!
    } else if (AppLocalizedStrings.getInterfaceLanguage() in [lanOpts]) {
        defaultLan = AppLocalizedStrings.getInterfaceLanguage();
    }
    const { language, setLanguage, localString } = useContext(LanguageContext);


    const handleChange = (event: SelectChangeEvent) => {
        localStorage.setItem('backdoor-university-pref-lan', event.target.value)
        setLanguage(event.target.value)
    }

    return (
        <Select
            value={language}
            label={AppLocalizedStrings.language}
            defaultValue={defaultLan}
            onChange={handleChange}
            sx={props.sx}
        >
            {lanOpts.map(lo => {
                return <MenuItem key={lo} value={lo}>
                    {getTranslatedLanCode(lo)}
                </MenuItem>
            })}
        </Select>
    )
}

export default LocaleSelector;