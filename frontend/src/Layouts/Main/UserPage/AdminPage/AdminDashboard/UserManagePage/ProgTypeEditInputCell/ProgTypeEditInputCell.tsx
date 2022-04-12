import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { GridRowId, useGridApiContext } from '@mui/x-data-grid';
import React, { useContext } from 'react'
import { LanguageContext } from '../../../../../../../Components/LanguageProvider/LanguageProvider';

interface IProgTypeEditInputCell {
    id: GridRowId,
    value: string,
    field: string,
}

const ProgTypeEditInputCell = (props: IProgTypeEditInputCell) => {
    const { localString } = useContext(LanguageContext)
    const { id, value, field } = props
    const apiRef = useGridApiContext()

    const handleChange = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
        apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    }

    const handleRef = (element: HTMLSpanElement) => {
        if (element) {
            const input = element.querySelector<HTMLInputElement>(
                `input[value="${value}"]`,
            );
            input?.focus();
        }
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
            <Select
                onChange={handleChange}
                ref={handleRef}
                value={value}
            >
                <MenuItem value={'undergard'}>{localString.undergrad}</MenuItem>
                <MenuItem value={'asso'}>{localString.asso}</MenuItem>
                <MenuItem value={'hd'}>{localString.hd}</MenuItem>
            </Select>
        </Box>
    )
}

export default ProgTypeEditInputCell;