import React from "react";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './index.css';


function Gridimg(props) {
    return (
        <Grid item lg={3} md={4} sm={6} xs={12} className="image"
            sx={{
                padding: '1rem 1rem',
            }}
        >
            <Link to="/movie" state={{props:props}}>
                <img src={props.photo} alt="MyImage" width="100%" height="90%"  />
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
        </Grid>
    )
}

export default Gridimg