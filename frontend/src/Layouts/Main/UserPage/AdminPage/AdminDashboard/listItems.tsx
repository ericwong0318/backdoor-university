import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import CommentIcon from '@mui/icons-material/Comment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { AdminDashboardLocalizationStrings as localString } from '../../../../../Localizations/AdminDashboardLocalizationStrings';
import { AdminDashboardPath } from '../../../../../App/constants';
import AdminDashboard from './AdminDashboard';

const mainListItemsData = [
  { text: localString.my_profile, icon: <AssignmentIndIcon />, path: AdminDashboardPath.myProfile },
  { text: localString.users, icon: <GroupIcon />, path: AdminDashboardPath.users },
  { text: localString.programmes, icon: <ListAltIcon />, path: AdminDashboardPath.programmes },
  { text: localString.comments, icon: <CommentIcon />, path: AdminDashboardPath.comments },
]

export const mainListItems = (
  <React.Fragment>
    {mainListItemsData.map((d) => {
      return <ListItemButton>
        <ListItemIcon>
          {d.icon}
        </ListItemIcon>
        <ListItemText primary={d.text} />
      </ListItemButton>
    })}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);
