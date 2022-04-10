import React, { useEffect, useState } from 'react'
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import LocalizedStrings from 'react-localization';
import { AppLocalizedStrings } from '../../App/localization';
import { MenuItem } from '@mui/material';

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
    const [lan, setLan] = useState(lanOpts[0])
    const defaultLan = (AppLocalizedStrings.getInterfaceLanguage() in lanOpts) ?
        AppLocalizedStrings.getInterfaceLanguage() :
        lanOpts[0]

    const handleChange = (event: SelectChangeEvent) => {
        setLan(event.target.value);
    }

    useEffect(() => console.log(lanOpts))

    return (
        <Select
            value={lan}
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