import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import './index.css';

const TrendingImage = styled('div')(({ theme }) => ({
    position: 'relative',
    margin: '1rem 1rem 0 1rem',
    height: '75vh',
}));

function Trending(props) {
    return (
        <>
            <TrendingImage className='image'>
                <Link  to="/movie" state={{props:props}}>
                    <img src={props.photo} alt="MyImage" width="100%" height="80%"  />
                </Link>
                <Typography
                    sx={{
                        color: 'white',
                        fontSize: '1.4rem',
                        textAlign: 'center',
                        backgroundColor: '#3F3A32',
                    }}
                >
                    {props.name}
                </Typography>
            </TrendingImage>
        </>
    )
}

export default Trending