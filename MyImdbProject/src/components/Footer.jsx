import React from "react";
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import facebook from '../assets/facebook.png'
import whatsapp from '../assets/whatsapp.png'
import insta from '../assets/insta.png'


const Footercontain = styled('div')(({ theme }) => ({
    backgroundColor: '#3F3A32',
    display: 'flex',
}));

const Fcontainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
}));

const Fbox = styled('div')(({ theme }) => ({
    display: 'flex',
    marginTop: '1rem',
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'space-around',
    marginBottom: '2rem',
    '& img': {
        height: '2.2rem',
    },
    '& a':{
        padding:'1rem',
        backgroundColor:'#23242a',
        borderRadius:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    '& a:hover':{
        background:'transparent',
        color:'black',
        transform:'scale(1.4)',
        transition:'all 0.2s ease-in'
    }
}))

function Footer() {
    return (
        <>
            <Footercontain>
                <Fcontainer>
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '2rem',
                            fontWeight: '700',
                            textAlign: 'center',
                            marginTop: '1rem',
                            marginBottom: '1rem',
                        }}
                    >
                        Contact Us
                    </Typography>
                    <Fbox>
                        <a href="https://api.whatsapp.com/send?phone=7378631056" target="_blank" rel="noopener noreferrer"><img src={whatsapp} alt="whatsapp" /></a>
                        <a href="https://www.facebook.com/sujal1885" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="facebook" /></a>
                        <a href="https://www.instagram.com/aka_sujal_" target="_blank" rel="noopener noreferrer"><img src={insta} alt="insta" /></a>
                    </Fbox>
                </Fcontainer>
            </Footercontain>
        </>
    )
}

export default Footer