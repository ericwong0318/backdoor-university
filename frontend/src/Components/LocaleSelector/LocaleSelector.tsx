import React, { useContext } from 'react'
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { LanguageContext } from '../LanguageProvider/LanguageProvider';

interface ILocaleSelectorProps extends SelectProps {
}

const LocaleSelector = (props: ILocaleSelectorProps) => {
    const { language, setLanguage, localString } = useContext(LanguageContext);
    const lanOpts = localString.getAvailableLanguages()

    const getTranslatedLanCode = (code: string) => {
        switch (code) {
            case 'en':
                return localString.en;

            case 'zh':
                return localString.zh;
        }
    }


    const handleChange = (event: SelectChangeEvent) => {
        localStorage.setItem('backdoor-university-pref-lan', event.target.value)
        setLanguage(event.target.value)
    }

    return (
        <Select
            value={language}
            label={localString.language}
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