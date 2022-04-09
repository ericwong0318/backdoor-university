import * as React from 'react';

import {Link, useParams} from "react-router-dom"

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



export default function listProg() {
    let progList = [
        {"id" : 1, "name" : "BSc in Learning Design and Technology", "school" : "CUHK"},
        {"id" : 2, "name" : "Mechanical and Automation Engineering", "school" : "CUHK"},
        {"id" : 3, "name" : "Computer Science and Engineering", "school" : "CUHK"},
        {"id" : 4, "name" : "Computational Data Science", "school" : "CUHK"},
        {"id" : 5, "name" : "BEng Financial Technology", "school" : "CUHK"},
        {"id" : 6, "name" : "BEng in Civil Engineering", "school" : "HKU"},
        {"id" : 7, "name" : "BEng in Computer Science", "school" : "HKU"},
        {"id" : 8, "name" : "BEng in Computer Engineering", "school" : "HKU"},
        {"id" : 9, "name" : "BEng in Electrical Engineering", "school" : "HKU"},
        {"id" : 10, "name" : "BEng in Industrial Engineering and Logistics Management", "school" : "HKU"},
        {"id" : 11, "name" : "BEng Financial Technology", "school" : "HKU"}
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
                        <ListItemText primary="The Chinese University of Hong Kong (CUHK)" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <Link to={'/programme/' +  progList[0].id }>
                                    <ListItemText primary= {progList[0].name} />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>

                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <Link to={'/programme/' +  progList[1].id }>
                                    <ListItemText primary = {progList[1].name} />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <Link to={'/programme/' +  progList[2].id}>
                                    <ListItemText primary= {progList[2].name} />
                                </Link>
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleClick2}>
                        <ListItemIcon >
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary="The University of Hong Kong (HKU)" />
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
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
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary={progList[9].name} />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary={progList[10].name} />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleClick3}>
                        <ListItemIcon >
                            <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary="The Hong Kong University of Science and Technology (UST)" />
                        {open3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open3} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="BEng in Aerospace Engineering " />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="BEng in Bioengineering " />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="BEng in Chemical Engineering " />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="BEng in Civil Engineering " />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="BEng in Computer Engineering " />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </div>
        </>
    );
}
