import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from './listItems';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    height:"14vh"
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    height:"14vh",
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

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
    if(open){
        console.log("open")
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
{
    !open ?    <Toolbar
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: [1],              
    }}
  >
    <IconButton onClick={toggleDrawer}>
    <ArrowForwardIosIcon sx={{fontSize:".99rem"}} />
    </IconButton>
  </Toolbar> : <Toolbar
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: [1],              
    }}
  >
    <IconButton onClick={toggleDrawer}>
    <ChevronLeftIcon />
    </IconButton>
  </Toolbar>
}
       
          <Divider />
          <List component="nav" className="h-full">
            {mainListItems}

          </List>
        </Drawer>
        <Box className="flex flex-col items-center p-4 h-screen grow bg-[#f8f8f9]">
            <Box className=" w-11/12 h-[15rem] bg-[#333] rounded bg-[url('https://www.teclab.edu.ar/wp-content/uploads/2017/04/Carrera.jpg')] bg-cover bg-center relative flex justify-center items-center">
                <span className="absolute w-full h-full bg-black opacity-50"></span>
                <h1 className="text-5xl font-bold text-center text-[#fff] relative">Talleres</h1>
            </Box>
            <Box className="gap-4 py-4 items-center flex flex-col grow w-11/12 h-[50vh] bg-[#f8f8f9]">
                <Link to="/account/panel/createworkshop" className='flex gap-4 p-4 items-center text-white rounded bg-white w-full h-[6rem] shadow-sm bg-[#ecfdf5] bg-cover'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 p-2 rounded-full bg-[#34d399] text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p className='text-[#047857]'>Agregar Taller</p>
                </Link>
            </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}