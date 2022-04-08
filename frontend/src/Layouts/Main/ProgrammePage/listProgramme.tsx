import * as React from 'react';
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



export default function NestedList() {
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
                                <ListItemText primary="BSc in Learning Design and Technology" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="Mechanical and Automation Engineering" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="Computer Science and Engineering" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="Computational Data Science" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="	BEng Financial Technology" />
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
                                <ListItemText primary="BEng in Civil Engineering" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="BEng in Computer Science" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="BEng in Computer Engineering" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="BEng in Electrical Engineering" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4, width: '100%' }}>
                                <ListItemIcon>
                                    <KeyboardArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary="	BEng in Electronic Engineering" />
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
