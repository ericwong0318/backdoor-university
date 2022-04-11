import * as React from 'react';

import { Link, useParams } from "react-router-dom"

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { useContext } from 'react';
import { LanguageContext } from '../../../Components/LanguageProvider/LanguageProvider';

export default function listProg() {

    const { localString } = useContext(LanguageContext)
    let progList = [
        { "id": 1, "name": localString.cuhk_ai, "school": localString.cuhk_name },
        { "id": 2, "name": localString.cuhk_ce, "school": localString.cuhk_name },
        { "id": 3, "name": localString.cuhk_cs, "school": localString.cuhk_name },
        { "id": 4, "name": localString.hku_civil, "school": localString.hku_name },
        { "id": 5, "name": localString.hku_eee, "school": localString.hku_name },
        { "id": 6, "name": localString.hku_mech, "school": localString.hku_name },
        { "id": 7, "name": localString.ust_civil, "school": localString.ust_name },
        { "id": 8, "name": localString.ust_chem, "school": localString.ust_name },
        { "id": 9, "name": localString.ust_mech, "school": localString.ust_name },
    ]


    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    const [open2, setOpen2] = React.useState(false);
    const handleClick2 = () => {
        setOpen2(!open2);
    };

    const [open3, setOpen3] = React.useState(false);
    const handleClick3 = () => {
        setOpen3(!open3);
    };

    return (
        <>
            <div>
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                        </ListSubheader>
                    }
                >


                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon >
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary={localString.cuhk_name} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <Link to={'/programme/' + progList[0].id}>
                                    <ListItemText primary={progList[0].name} />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>

                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <Link to={'/programme/' + progList[1].id}>
                                    <ListItemText primary={progList[1].name} />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <Link to={'/programme/' + progList[2].id}>
                                    <ListItemText primary={progList[2].name} />
                                </Link>
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleClick2}>
                        <ListItemIcon >
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary={localString.hku_name} />
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary={progList[3].name} />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary={progList[4].name} />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary={progList[5].name} />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleClick3}>
                        <ListItemIcon >
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary={localString.ust_name} />
                        {open3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open3} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary={progList[6].name} />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary={progList[7].name} />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary={progList[8].name} />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton>
                        <ListItemIcon >
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary={localString.cityu_name} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon >
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary={localString.polyu_name} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon >
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary={localString.edu_name} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon >
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary={localString.hsu_name} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </List>
            </div>
        </>
    );
}
