import * as React from 'react';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Trending from './Trending';
import { responsive } from './TrendingData';
import Gridimg from './Gridimg';
import { useState, useEffect } from 'react';

function Home() {
    const [trendingData, setTrendingData] = useState([]);
    const [latestData, setLatestData] = useState([]);
    const [englishData, setEnglishData] = useState([]);
    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDBAPI}&language=hindi-India&page=1
                `);
                const data = await response.json();
                console.log(data);
                const trendingMovies = data.results.slice(0, 7).map((movie) => ({
                    id: movie.id,
                    photo: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                    name: movie.title
                }));
                const latestMovies = data.results.slice(8, 12).map((movie) => ({
                    id: movie.id,
                    photo: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                    name: movie.title
                }));
                const englishMovies = data.results.slice(13, 17).map((movie) => ({
                    id: movie.id,
                    photo: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                    name: movie.title
                }));
                setTrendingData(trendingMovies);
                setLatestData(latestMovies);
                setEnglishData(englishMovies);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTrendingMovies();
    }, []);
    const trendimages = trendingData.map((item) => <Trending photo={item.photo} name={item.name} />);
    const latestimages = latestData.map((item) => <Gridimg photo={item.photo} name={item.name} />)
    const englishimages = englishData.map((item) => <Gridimg photo={item.photo} name={item.name} />)


    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#262420',
                    padding: '1rem',
                }}
            >
                <Typography
                    sx={{
                        color: '#BBC4C2',
                        fontSize: '2rem',
                        marginLeft: '1rem',
                    }}
                >
                    Trending
                </Typography>
                <Carousel responsive={responsive}
                    autoPlay={true}
                    autoPlaySpeed={2000}
                    infinite={true}
                    transitionDuration={500}
                >
                    {trendimages}
                </Carousel>
                <Typography
                    sx={{
                        color: '#BBC4C2',
                        fontSize: '2rem',
                        marginLeft: '1rem',
                        marginTop: '1rem',
                    }}
                >
                    Latest
                </Typography>
                <Grid container spacing={1}>
                    {latestimages}
                </Grid>
                <Typography
                    sx={{
                        color: '#BBC4C2',
                        fontSize: '2rem',
                        marginLeft: '1rem',
                        marginTop: '1rem',
                    }}
                >
                    English
                </Typography>
                <Grid container spacing={1} sx={{ marginBottom: '2rem' }}>
                    {englishimages}
                </Grid>
            </Box>
        </>
    )
}

export default Home