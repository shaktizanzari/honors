import React from "react";
import { styled } from "@mui/material";

const Container = styled('div')(({}) => ({
    backgroundColor: '#151818',
    display: 'flex',
    fontFamily:'Roboto Mono',
    padding:'3rem',
    fontSize:'1.7rem',
    color:'white'
}));


function About(){
    return(
        <>
            <Container>
                This is a full stack MyImdb website build on the lines of IMDB . Here we get trending and popular movies . The data is directly fetched from the api and is not static . Hence user always gets the updated data . The user can sign in the application and the he gets the access to rate a particular movie . The rating of the movie is calculated on the votes received by the user.
                <br /><br />
                This site is completely built on React framework using material ui css . Hence , this site is very smooth and does not the over burden of page overload . Also this website is fully responsive in all modes . This makes this site more robust and dynamic.

                Suggestions to improve this website are always welcome.
            </Container>
        </>
    )
}

export default About