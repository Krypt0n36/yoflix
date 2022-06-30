import * as React from "react";
import { useState, useEffect } from 'react'
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Sidebar from "./Components/Sidebar";
import RightBar from "./Components/Rightbar";
import { Container } from "@mui/system";
import { Button, Chip, CircularProgress, Fade, Grid, Grow, IconButton, Rating, Slide, Stack, Tab, Tabs, useMediaQuery } from "@mui/material";
import AspectRatioBox from "./Components/AspectRatioBox";
import { ArrowBackIos, ArrowBackIosNew, ArrowForward, ArrowForwardIos, Menu, Search } from "@mui/icons-material";
import axios from "axios";
import useWindowDimensions from "./customHooks";
import { genres } from "./Utils/genres";
import Discover from "./Containers/Discover";
import { VMovieCard } from "./Components/MovieCard";
import HSlider from "./Components/Slider";
import Brand from './brand.png';
import { useDispatch, useSelector } from "react-redux";
import { changeDefaultType } from "./Actions";
import { searchByGenre } from "./Utils/api";

function MainSugg(props) {
  return (
    <div
      style={{
        width: '100%',
        height: 320,
        backgroundColor: 'whitesmoke',
        position: 'relative',
        backgroundImage: 'url(https://m.media-amazon.com/images/M/MV5BMTJiMzgwZTktYzZhZC00YzhhLWEzZDUtMGM2NTE4MzQ4NGFmXkEyXkFqcGdeQWpybA@@._V1_.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', background: 'linear-gradient(to top, #000000bf, #00000024)' }}>

        <div style={{
          position: 'absolute',
          bottom: 30,
          left: 30,
          color: 'white',
        }}>
          <Typography variant="subtitle1">SEASON 2</Typography>
          <Typography variant="h4">Breaking Bad</Typography>
          <Typography variant="subtitle2">Drama/Action/Crime</Typography>
          <Stack direction="row" spacing={1} style={{
            marginTop: 20
          }}>
            <Button variant="contained" style={{
              borderRadius: 0
            }}>Read more</Button>
            <Button style={{
              borderRadius: 0
            }} variant="light">Watch later</Button>
          </Stack>
        </div>
      </div>

    </div>
  )
}



function TrendingList(props) {
  const [bucket, setBucket] = useState([]);
  const [page, setPage] = useState(1);
  const [referenceNode, setReferenceNode] = useState();
  const scrollerRef = React.useRef(null)
  const [loading, setLoading] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const [autoScroll, setAutoScroll] = useState(false)


  function fetchBucket() {

    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=050c9271bb810b20fb8022bfb34edbc4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`)
      .then((resp) => {
        console.log('data retrieved')
        setBucket(bucket.concat(resp.data.results))
        setTimeout(() => {
          setLoading(false)

        }, 1000)
      })
      .catch(err => {
        setLoading(false)

      })
  }
  useEffect(() => {
    fetchBucket()



  }, [])


  return (
    <Box>
      <HSlider title="Trending Now" w={props.w}>
        {!loading && bucket.map(item => <div style={{ width: '200px', marginRight: 5 }} ><VMovieCard info={item} /></div>)}
        {loading && <div style={{ width: '100%', textAlign: 'center', boxSizing: 'border-box', paddingTop: 100 }}><CircularProgress style={{ margin: 'auto' }} /></div>}
      </HSlider>
    </Box>

  )
}



function RecommendedList(props) {
  const [bucket, setBucket] = useState([]);
  const [page, setPage] = useState(1);
  const [referenceNode, setReferenceNode] = useState();
  const scrollerRef = React.useRef(null)
  const [loading, setLoading] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const [autoScroll, setAutoScroll] = useState(false)


  function fetchBucket() {

    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=050c9271bb810b20fb8022bfb34edbc4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`)
      .then((resp) => {
        console.log('data retrieved')
        setBucket(bucket.concat(resp.data.results))
        setTimeout(() => {
          setLoading(false)

        }, 1000)
      })
      .catch(err => {
        setLoading(false)

      })
  }
  useEffect(() => {
    fetchBucket()



  }, [])


  return (
    <Box>
      <HSlider w={props.w} title={"Recommended for you "}>
        {!loading && bucket.map(item => <div style={{ width: '200px', marginRight: 5 }} ><VMovieCard info={item} /></div>)}
        {loading && <div style={{ width: '100%', textAlign: 'center', boxSizing: 'border-box', paddingTop: 100 }}><CircularProgress style={{ margin: 'auto' }} /></div>}
      </HSlider>
    </Box>

  )
}




function Home() {


  return (
    <Box style={{ padding: 10 }} >
      <Stack spacing={2} >
        <MainSugg />
        <RecommendedList />
        <TrendingList />
      </Stack>
    </Box>
  );
}





function History() {
  return (
    <Box>
      <Stack spacing={2}>

        <Box>
          <div
            style={{
              display: 'inline-flex',
              width: '100%'
            }}
          >
            <Typography variant="h6" style={{ marginBottom: 10 }}>History</Typography>


          </div>

        </Box>
      </Stack>
    </Box>
  )
}

function Watchlist() {
  return (
    <Box>
      <Stack spacing={2}>

        <Box>
          <div
            style={{
              display: 'inline-flex',
              width: '100%'
            }}
          >
            <Typography variant="h6" style={{ marginBottom: 10 }}>Watchlist</Typography>


          </div>
          <Grid container spacing={1} fullWidth>


          </Grid>
        </Box>
      </Stack>
    </Box>
  )
}

export default function App() {
  const [tab, setTab] = useState(0)
  const [rightBarOpened, toggleRightBar] = useState(false)
  const [leftBarOpened, toggleLeftBar] = useState(true)

  const [type, setType] = useState(0)
  const bodyRef = React.useRef(null)
  const mobile = useMediaQuery('(max-width:700px)')
  const containerRef = React.useRef(null)
  const [w, setW] = useState();
  const mediaType = useSelector(state=>state.media)
  const dispatch = useDispatch()

  useEffect(() => {
    if (window.innerWidth <= 900) {
      setW(window.innerWidth - 20);
    } else {
      setW(window.innerWidth - 270);
    }
    window.addEventListener('resize', () => {
      console.log('resized')
      if (window.innerWidth <= 900) {
        setW(window.innerWidth - 20);
      } else {
        setW(window.innerWidth - 270);
      }

    })
  }, [])



  return (
    <Box sx={{ display: "flex" }} ref={bodyRef}>
      <CssBaseline />
      <Sidebar setTab={setTab} tab={tab} opened={leftBarOpened} toggleLeftBar={toggleLeftBar} mobile={mobile}  />

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", width: w }}
      >
        <Toolbar style={{ padding: 0, paddingLeft: 10, paddingRight: 10 }} sx={{
          '& .MuiToolbar-root': {
            padding: 0
          }
        }}>

          {mobile && <IconButton style={{ margin: 'auto', marginLeft: 0 }} aria-label="delete" size="medium" onClick={(e) => { e.preventDefault(); toggleLeftBar(true) }}>
            <Menu fontSize="medium" />
          </IconButton>}

          {mobile? <img src={Brand} height={35} />:<Box p={0}>
            <Tabs value={mediaType=='movie'?0:1} aria-label="basic tabs example" textColor='primary'>
              <Tab label="Movies" onClick={() =>{dispatch(changeDefaultType('movie')); dispatch(searchByGenre()) }} />
              <Tab label="TV Shows" onClick={() => { dispatch(changeDefaultType('tv')); dispatch(searchByGenre()) }} />
            </Tabs>
          </Box>}

          <IconButton style={{ margin: 'auto', marginRight: 0 }} aria-label="delete" size="medium" onClick={(e) => { e.preventDefault(); toggleRightBar(true) }}>
            <Search fontSize="medium" />
          </IconButton>
        </Toolbar>


        {tab == 0 && <Home />}
        {tab == 1 && <Discover />}
        {tab == 2 && <History />}
        {tab == 3 && <Watchlist />}

      </Box>

      <RightBar opened={rightBarOpened} toggleRightBar={toggleRightBar} />
    </Box>
  );
}
