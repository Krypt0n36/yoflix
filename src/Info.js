import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Rating, Tab, Tabs, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import AspectRatioBox from "./Components/AspectRatioBox";
import HSlider from "./Components/Slider";
import { VMovieCard } from "./Components/MovieCard"
import { Movie } from "@mui/icons-material";
import Brand from './brand.png';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function EpisodesList(props) {
    return (
        <List sx={{ width: '100%', height: 300, overflowY: 'scroll' }}>
            {new Array(props.list).fill(1).map((item, index)=> <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <Movie />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`Episode ${index}`} secondary="Jan 9, 2014" />
            </ListItem>)}
           
        </List>
    )
}
export default function Info(props) {
    const { mid } = useParams()
    const [info, setInfo] = useState({ genres: [], seasons:[{episode_count:0}] })
    const [selectedSeason, setSelectedSeason] = useState(0)
    const [tv, setTv] = useState(false)
    useEffect(() => {
        // fetch movie info
        console.log(mid)
        axios.get(`https://api.themoviedb.org/3/movie/${mid}?api_key=050c9271bb810b20fb8022bfb34edbc4&language=en-US`)
            .then((resp) => {
                if (resp.status == 200) {
                    console.log(resp)
                    setInfo(resp.data)
                }else{
                    console.log('not found in movies')
                    axios.get(`https://api.themoviedb.org/3/tv/${mid}?api_key=050c9271bb810b20fb8022bfb34edbc4&language=en-US`)
                    .then((resp) => {
                        setInfo(resp.data)
                        setTv(true)

                    })
                    .catch(err1 => {
                        console.log(err1)

                    })
                }
               
            })
            .catch(err => {
                console.log(err)
                axios.get(`https://api.themoviedb.org/3/tv/${mid}?api_key=050c9271bb810b20fb8022bfb34edbc4&language=en-US`)
                    .then((resp) => {
                        setInfo(resp.data)
                        setTv(true)

                    })
                    .catch(err1 => {
                        console.log(err1)
                    })
            })
    }, [])
    return (
        <Container >
            <img src={Brand} height={40} style={{ marginBottom: 20, marginTop: 20, cursor: 'pointer' }} onClick={() => { window.location = '/' }} />
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <AspectRatioBox ratio={2 / 3}>
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'whitesmoke',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${info['poster_path']})`
                            }}
                        ></div>
                    </AspectRatioBox>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h3">{info['title'] || info['name']}</Typography>
                    <Typography variant="subtitle1">{info['genres'].map(g => <span>{g.name} / </span>)}</Typography>
                    <Rating name="read-only" sx={{ marginTop: 1 }} value={2} readOnly />
                    <Typography variant="subtitle2">Description :</Typography>
                    <Typography variant="subtitle1">
                        {info['overview']}
                    </Typography>
                    {tv&&<Box sx={{}}>
                        <Tabs value={selectedSeason} aria-label="basic tabs example">
                            {info['seasons']&&info['seasons'].map(season=><Tab label={`Season ${season.season_number}`}  onClick={(e)=>{e.preventDefault(); setSelectedSeason(season.season_number)}}/>)}
                        </Tabs>
                    </Box>}
                    {tv&&<EpisodesList list={info['seasons'][selectedSeason]['episode_count']}/>}

                </Grid>
            </Grid>
        </Container>
    )
}