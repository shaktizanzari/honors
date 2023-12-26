import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";




const Logincontainer = styled('div')(({}) => ({
    display: 'flex',
    backgroundColor:'#151818',
    justifyContent:'center',
    alignItems:'center',
    padding:'1rem'
}));

const Loginform = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection:'column',
    width:'40%',
    backgroundColor:'#3a3a3a',
    borderRadius:'1rem 1rem 1rem 1rem',
    '& form':{
        display:'flex',
        flexDirection:'column',
        padding:'1rem'
    },
    [theme.breakpoints.down(700)]: {
        width: '60%', 
      },
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


const Loginheader = styled('div')(({})=>({
    padding:'1rem',
    backgroundColor:'gray',
    borderRadius:'1rem 1rem 0 0'
}));

function Login(){
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [registered,setRegistered] = useState(false);
    const [token,setToken] = useState('');
    const [open,setOpen] = useState(false);
    const [message,setMessage] = useState('');

    const handleregister = () =>{
        setRegistered(!registered);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            navigate('/');
        }
    }, []);
    
    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };


    const handleChange= (e) =>{
        if(e.target.name==='name'){
            setName(e.target.value);
        }
        else if(e.target.name==='email'){
            setEmail(e.target.value);
        } else{
            setPassword(e.target.value);
        }
    };

    const handleSubmit =async (e) =>{
        e.preventDefault();
        let logincredential = {};
        let registercredential = {};
        if(registered){
            logincredential = {email:email,password:password};
            // console.log(logincredential);
        } else{
            registercredential = {name:name,email:email,password:password};
            // console.log(registercredential);
        }
       

        let url = registered?'https://myimdbbackend-sujal1885.onrender.com/login':'https://myimdbbackend-sujal1885.onrender.com/register';

        axios.post(url,registered?logincredential:registercredential)
        .then((response)=>{
            if(response.status===200){
                setName('');
                setEmail('');
                setPassword('');
                console.log('success');
                setMessage('Successfully Logged in!!!');
                localStorage.setItem('token',response.data.token);
                setToken(response.data.token);
                if(response.data.token){
                    navigate('/');
                }
            } else{
                setMessage('Email already registered!')
                // console.log('not success');
            }
        })
        .catch((error)=>{
            setMessage('Something went wrong');
            // console.log('error',error);
        });
        handleOpen();
    };

    return(
        <>
            <Logincontainer>
                <Loginform>
                    <Loginheader>
                        <Typography 
                            sx={{
                                color:'white',
                                textAlign:'center',
                                fontSize:'2rem',
                                fontWeight:'700',
                                '@media screen and (max-width: 500px)': {
                                    fontSize:'1rem'
                                },
                            }}
                        >
                            Login/Register
                        </Typography>
                    </Loginheader>
                    <form onSubmit={handleSubmit}>
                        { !registered && <TextField 
                            id="outlined-basic" 
                            label={name===""?'Name':''}
                            variant="outlined" 
                            required
                            name="name"
                            InputLabelProps={{
                                style: {
                                  color: 'gray', 
                                },
                            }}
                            inputProps={{
                                style: {
                                  color: 'gray',
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'gray',
                                  borderWidth:'0.2rem'
                                },
                                marginBottom:'1rem',
                            }}
                            value={name}
                            onChange={handleChange}
                        /> }
                        <TextField 
                            id="outlined-basic" 
                            label={email===""?'Email':''}
                            variant="outlined"
                            name="email"
                            required
                            type="email" 
                            InputLabelProps={{
                                style: {
                                  color: 'gray', 
                                },
                            }}
                            inputProps={{
                                style: {
                                  color: 'gray',
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray',
                                    borderWidth:'0.2rem'
                                },
                                marginBottom:'1rem',
                            }}
                            value={email}
                            onChange={handleChange}
                        />
                        <TextField 
                            id="outlined-basic" 
                            label={password===""?'Password':''}
                            variant="outlined"
                            name="password"
                            required
                            InputLabelProps={{
                                style: {
                                  color: 'gray', 
                                },
                            }}
                            inputProps={{
                                style: {
                                  color: 'gray',
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray',
                                    borderWidth:'0.2rem'
                                },
                                marginBottom:'1rem',
                            }}
                            value={password}
                            onChange={handleChange}
                        />
                              <Button 
                                variant="contained" type="submit"
                                sx={{
                                    backgroundColor:'gray',
                                    width:'60%',
                                    margin:'0 auto 1rem auto',
                                    height:'3rem',
                                    fontWeight:'700',
                                    '&:hover':{
                                        backgroundColor:'gray',
                                        transform:'scale(1.1)',
                                        transition:'0.4s ease-in'
                                    }
                                }}
                              >
                                {registered?'Login':'Register'}
                              </Button>
                              <Typography
                                  sx={{
                                    textAlign:'center',
                                    color:'white',
                                    fontSize:'1.2rem',
                                    '& a':{
                                        color:'black',
                                        cursor:'pointer',
                                        fontWeight:'700'
                                    }
                                  }}
                              >
                                  {registered?(
                                    <>
                                        <p>Not registered yet! <a onClick={handleregister}>Register</a></p>
                                    </>
                                  ):(
                                    <>
                                        <p>Already registered ! <a onClick={handleregister}>sign in</a></p>
                                    </>
                                  )}
                              </Typography>
                    </form>
                </Loginform>
            </Logincontainer>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Modalcontainer>
                    {message}
                </Modalcontainer>
            </Modal>
        </>
    )
}

export default Login