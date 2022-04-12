import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { LanguageContext } from '../../../../../Components/LanguageProvider/LanguageProvider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { AdminDashboardPath, LayoutPath } from '../../../../../App/constants';
import { useState } from 'react';
import { Button, CircularProgress, Tab, Tabs } from '@mui/material';
import TabPanel from './TabPanel/TabPanel';
import UserManagePage from './UserManagePage/UserManagePage';
import ProfileCard from '../../UserProfile/ProfileCard/ProfileCard';
import AdminProfile from './AdminProfile/AdminProfile';
import ProgrammeManagePage from './ProgrammeManagePage/ProgrammeManagePage';
import { useNavigate } from 'react-router-dom';
import LocaleSelector from '../../../../../Components/LocaleSelector/LocaleSelector';
import { useAuth } from '../../../../../Components/auth/AuthProvider';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function DashboardContent() {
  const { localString } = React.useContext(LanguageContext)
  const auth = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [tabValue, setTabValue] = useState(0);

  const mainListItemsData = [
    { text: localString.my_profile, icon: <AssignmentIndIcon />, path: 0 },
    { text: localString.users, icon: <GroupIcon />, path: 1 },
    { text: localString.programmes, icon: <ListAltIcon />, path: 2 },
    // { text: localString.comments, icon: <CommentIcon />, path: 3 },
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            { }
          </Typography>

          <LocaleSelector sx={{ marginLeft: 'auto' }} />
          <Typography sx={{ marginLeft: "auto" }}>
            <Button color="secondary" onClick={() => navigate(LayoutPath.home)}>
              {localString.back_to_home}
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Tabs
          orientation='vertical'
          value={tabValue}
          onChange={(e, val) => setTabValue(val)}
        >
          {mainListItemsData.map((d) => {
            return <Tab label={open ? d.text : ""} icon={d.icon} iconPosition="start" />
          })}
        </Tabs>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

          <TabPanel index={0} value={tabValue}>
            {
              auth.user ? (
                <AdminProfile email={auth.user.email} />
              ) : (
                <CircularProgress />
              )
            }
          </TabPanel>
          <TabPanel index={1} value={tabValue}>
            <UserManagePage />
          </TabPanel>
          <TabPanel index={2} value={tabValue}>
            <ProgrammeManagePage />
          </TabPanel>
          <TabPanel index={3} value={tabValue}>
            <UserManagePage />
          </TabPanel>
        </Container>
      </Box>
    </Box>
  );
}

export default function AdminDashboard() {
  return <DashboardContent />;
}
