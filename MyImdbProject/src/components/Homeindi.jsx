import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import star from '../assets/star.png';
import filledstar from '../assets/filledstar.png';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Rating } from '@mui/material';
import Modal from "@mui/material/Modal";
import Typography from '@mui/material/Typography';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const Modalcontainer = styled('div')(({})=>({
    margin:'auto',
    height:'8rem',
    backgroundColor:'white',
    color:'black',
    border:'solid 5px #f59b9b',
    padding:'1rem 2rem',
    fontSize:'1.2rem',
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:'1rem'
}));

const Ratingcustom = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '90%',
    justifyContent: 'space-evenly',
    margin:'0 auto',
    fontSize:'1.2rem',
    marginTop:'1rem',
}));

const TotalRating = styled('div')(({theme})=>({
    display:'flex',
    flexDirection:'column',
    color:'white',
    fontFamily:'sans-serif'
}));

const YourRating = styled('div')(({theme})=>({
    display:'flex',
    flexDirection:'column',
    color:'white',
    fontFamily:'sans-serif'
}));

const Rate = styled('div')(({theme})=>({
    display:'flex',
    flexDirection:'column',
    color:'white',
    fontFamily:'sans-serif'
}));

const Moviedetail = styled('div')(({theme})=>({
    display:'flex',
    flexDirection:'column',
    width:'90%',
    margin:'2rem auto',
    '& span':{
        color:'white',
        fontSize:'2rem',
        fontFamily:'sans-serif',
        marginBottom:'1rem',
    },
    '& img':{
        width:'50%',
        margin:'0 auto',
        borderRadius:'1rem',
        marginBottom:'2rem'
    }
}));

const Detail = styled('div')(({theme})=>({
    display:'flex',
    flexDirection:'column',
    '& span':{
        color:'white',
        fontSize:'1.7rem',
        fontFamily:'sans-serif',
        margin:'0'
    },
    '& hr':{
        width:'100%',
    }
}));

const Starbox = styled('div')(({theme})=>({
    display:'flex',
    margin:'1rem 0',
    '& img':{
        width:'10%',
        marginRight:'1rem'
    },
    
}));

const StarboxDetail = styled('div')(({theme})=>({
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    margin:'auto 0',
}));

function Homeindi(props){
    console.log(props);
    const [moviedata, setMoviedata] = useState({});
    const [open,setOpen] = useState(false);
    const [open1,setOpen1] = useState(false);
    const [value,setValue] = useState(null);
    const [totalrating,setTotalrating] = useState(0);
    const [yourrating,setYourrating] = useState(0);
    const [voted,setVoted] = useState(0);
    const navigate = useNavigate();
    const handleOpen = () => {
        const token = localStorage.getItem('token');
        if(!token){
            return handleOpen1();
        }
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

      const handleOpen1 = () => {
        setOpen1(true);
      };
      const handleClose1 = () => {
        setOpen1(false);
      };

      const handleChange = (_event,newValue) => {
        setValue(newValue);
        // console.log(value);
      }

      const handleClick =async () => {
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token);
        // console.log(decodedToken);
        const userEmail = decodedToken.email;
        const moviedata1 = {
            email:userEmail,
            moviename:moviedata.Title,
            movierating:value
        }
        axios.post('https://myimdbbackend-sujal1885.onrender.com/ratemovie',moviedata1)
        .then((response)=>{
            if(response.status===200){
            //    console.log('success');
               setValue(0);
               handleClose();
               navigate('/');
            //    window.location.reload(); 
            } else{
                navigate('/');
                // console.log('not success');
                // window.location.reload(); 
            }
        })
        .catch((error)=>{
            // console.log('error',error);
            navigate('/');
            // window.location.reload(); 
        });
      }

      axios.post('https://myimdbbackend-sujal1885.onrender.com/getRating',{name:props.props.name})
        .then((response)=>{
            if(response.status===200){
                // console.log('getrating ',response);
                setTotalrating(response.data.totrating);
                setVoted(response.data.voted);
            //    console.log('success');
            } else{
                // console.log('not success');
            }
        })
        .catch((error)=>{
            // console.log('error',error);
        });

        if(localStorage.getItem('token')){
            const token = localStorage.getItem('token')
            const decodedToken = jwtDecode(token);
            // console.log(decodedToken);
            const userEmail = decodedToken.email;
            const mymovie = {
                email:userEmail,
                moviename:props.props.name
            }

            axios.post('https://myimdbbackend-sujal1885.onrender.com/getmyRating',mymovie)
            .then((response)=>{
                if(response.status===200){
                    // console.log('getmyrating ',response);
                    setYourrating(response.data.myrating);
                    // console.log('success');
                } else{
                    setYourrating(-1);
                    // console.log('not success');
                }
            })
            .catch((error)=>{
                // console.log('error',error);
            });
        }

    useEffect(() => {
        

        const fetchMovies = async () => {
            try {
                // console.log(props.props.name);
                const response = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDBAPI}&t=${props.props.name}`);
                const data = await response.json();
                // console.log(data);
                setMoviedata(data);
            } catch (error) {
                // console.log(error);
            }
        };
        fetchMovies();

        

    }, [props]);
    return(
        <>
        {Object.keys(moviedata).length==0?<>Movie unavailable or field empty</> :
            <Box 
            sx={{
                backgroundColor:'#000000',
                padding:'1rem',
            }}
            >
                <Ratingcustom>
                    <TotalRating>
                        <span>MyImdb Rating</span>
                        <Starbox>
                            <img src={filledstar} alt="filledstar" />
                            <StarboxDetail>
                                <span>
                                    {totalrating}/5
                                </span>
                                <span>{voted}</span>
                            </StarboxDetail>
                        </Starbox>
                    </TotalRating>
                   {localStorage.getItem('token') && <YourRating>
                        <span>Your Rating</span>
                        <Starbox>
                            <img src={filledstar} alt="filledstar" />
                            <StarboxDetail>
                                {yourrating==-1 || yourrating==-5 ? <span>Not Rated</span>:<span>{yourrating}/5</span>} 
                            </StarboxDetail>
                        </Starbox>
                    </YourRating> }
                    <Rate>
                        <span>Rate</span>
                        <Starbox onClick={handleOpen}
                            sx={{
                                '&:hover':{
                                    cursor:'pointer'
                                }
                            }}
                        >
                            <img src={star} alt="star" style={{
                                width:'3rem',
                            }} />
                        </Starbox>
                    </Rate>
                </Ratingcustom>
                
                <Moviedetail>
                    <span>{moviedata.Title}</span>
                    <img src={moviedata.Poster} alt="MovieImage" />
                    <Detail>
                        <span>Title : {moviedata.Title}</span>
                        <hr />
                        <span>Actor : {moviedata.Actors}</span>
                        <hr />
                        <span>Director : {moviedata.Director}</span>
                        <hr />
                        <span>genre : {moviedata.Genre}</span>
                        <hr />
                        <span>Plot : {moviedata.Plot}</span>
                    </Detail>
                </Moviedetail>
            </Box>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Modalcontainer>
                <Typography
                    sx={{
                        fontSize:'1.7rem',
                        fontWeight:'700',
                        color:'blue',

                    }}
                >
                    Rate
                </Typography>
                <Rating 
                    value={value}
                    onChange={handleChange}
                    sx={{
                        fontSize:'3rem',
                    }}
                />
                <Button 
                    onClick={handleClick}
                    sx={{
                        backgroundColor:'#e1875f',
                        color:'white',
                        textTransform:'none',
                        marginTop:'0.5rem',
                        '&:hover':{
                            backgroundColor:'#e1875f',
                            color:'white'
                        }
                    }}
                >
                    Submit
                </Button>
                </Modalcontainer>
            </Modal>
            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Modalcontainer>
                <Typography
                    sx={{
                        fontSize:'1.7rem',
                        fontWeight:'700',
                        color:'black',

                    }}
                >
                    Please sign in!
                </Typography>
                </Modalcontainer>
            </Modal>
        </>
    )
}

export default Homeindi

