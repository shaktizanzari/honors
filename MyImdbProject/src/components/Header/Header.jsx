import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './header.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Modal from '@mui/material/Modal';

const drawerWidth = 240;


const Menu = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  color: '#fff',
  fontFamily: 'Poppins',
  '& > *': {
    fontSize: '1.4rem',
    fontWeight: '500'
  }, [theme.breakpoints.down('sm')]: {
    display: 'none',
  }
}));

const MIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '20%',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  }
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor:'pointer',
  zIndex:'99'
}));

const Modalcontainer = styled('div')(({})=>({
  margin:'auto',
  width:'40%',
  height:'5rem',
  backgroundColor:'black',
  color:'white',
  border:'solid 5px gray',
  padding:'1rem',
  fontSize:'1.2rem',
  position:'absolute',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,-50%)',
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

function Header() {
  const theme = useTheme();
  const [istoken,setIstoken] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [openmodal,setOpenmodal] = useState(false);
  const handleOpen = () => {
    setOpenmodal(true);
  };
  const handleClose = () => {
    setOpenmodal(false);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    console.log(searchText);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if(event.target.value.length==0){
        alert("Text field cannot be Empty");
        return;
      }
      setSearchText(event.target.value);
      handleSubmit();
      setSearchText('')
    }
  };

  const handleClick = (event) => {
    if(searchText.length==0){
      alert("Text field cannot be Empty");
      return;
    }
    setSearchText(event.target.value);
    handleSubmit();
    setSearchText('')
  }

  const handleSubmit=()=>{
    navigate('/movie', {state:{props:{name:searchText}}});
  }

  const handlenavigation = (text) => {
    if(text==='Home'){
      navigate('/');
    }
    else if(text==='About'){
      navigate('/about');
    }
    else if(text==='Sign in'){
      navigate('/login');
    } else{
      logout();
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
        setIstoken(true);
    }
}, []);

    const logout = () =>{
      handleOpen();
      localStorage.removeItem("token");
      setIstoken(false);
      navigate('/',{state:{props:{name:searchText}}});
    }


  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
        <AppBar position="static" sx={{ backgroundColor: '#140005' }}>
          <Toolbar>
            <Typography
              sx={{
                fontFamily: 'Irish Grover',
                color: ' #fff',
                fontSize: '1.8rem',
                marginRight: '1rem',
              }}
            >
              MyMDB
            </Typography>
            <Search>
              <SearchIconWrapper
                  onClick={handleClick}
              >
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for Movies"
                value={searchText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Menu>
              <Link to="/" style={{textDecoration:'none',color:'white',fontWeight:'700'}}><Typography className='links'>Home</Typography></Link>
              <Link to="/about" style={{textDecoration:'none',color:'white',fontWeight:'700'}}><Typography className='links'>About</Typography></Link>
            {!istoken && <Link to="/login" style={{textDecoration:'none',color:'white',fontWeight:'700'}}><Typography className='links'>Sign in</Typography></Link>
            }
            {istoken && <Link  onClick={logout} to="/" style={{textDecoration:'none',color:'white',fontWeight:'700'}}><Typography className='links'>Sign out</Typography></Link>
            }
            </Menu>
            <MIcon onClick={handleDrawerOpen}
              sx={{ ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </MIcon>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 1,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: '#262420',
              color: 'white',
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon style={{ color: 'white' }} /> : <ChevronRightIcon style={{ color: 'white' }} />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Home', 'About', 'Sign in','Sign out'].map((text, index) => (
             (!(istoken && text==='Sign in') && !(text==='Sign out') &&  <ListItem onClick={() => handlenavigation(text)}  key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} className='links' />
                </ListItemButton>
              </ListItem> ) || ( text==='Sign out' && istoken &&
                <ListItem onClick={() => handlenavigation(text)} key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} className='links' />
                </ListItemButton>
              </ListItem>
              )
            ))}
          </List>
        </Drawer>
      </Box>
      <Modal
                open={openmodal}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Modalcontainer>
                    Successfully logged out!!
                </Modalcontainer>
     </Modal>
    </>
  )
}
export default Header