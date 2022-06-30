import { Button, Fade, Rating, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import {useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { watchListAdd } from '../../Actions';
import { getGenreName } from '../../Utils/genres';
import AspectRatioBox from '../AspectRatioBox';


function VMovieCard(props) {
    const [hovered, setHovered] = useState(false)
    const containerRef = useRef(null);
    const dispatch = useDispatch()
    const [inWatchList, setInWatchList] = useState(false)
    return (
  
      <Box onClick={(e)=>{e.preventDefault(); window.location = '/info/'+props.info.id}} style={{ backgroundColor: 'whitesmoke', width: '100%', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `url('https://image.tmdb.org/t/p/w500${props.info.poster_path || 'undef'}')` }} onMouseEnter={() => { setHovered(true) }} onMouseLeave={() => { setHovered(false) }} >
        <AspectRatioBox ratio={2 / 3}>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to top, #00000061, transparent)', position: 'relative' }}>
            <div style={{
              width: '100%',
              height: '100%',
              color: 'white',
              cursor: 'pointer'
            }}
              ref={containerRef}
            >
              <Fade
                direction="up"
                in={hovered}
                container={containerRef.current}
              >
                <div style={{ backgroundColor: '#00000075', width: '100%', height: '100%', padding: 10, position: 'relative' }}>
  
                  <div style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    width: 'CALC(100% - 20px)',
                  }}>
                    <Typography variant="h6" style={{
                      textShadow: '0px 0px 2px #00000070'
                    }}>{props.info.title||props.info.name}</Typography>
                    <Typography variant="subtitle2">{props.info.genre_ids.map(g=><span>{getGenreName(g)}, </span>)}</Typography>
                    <Rating name="read-only" sx={{ marginTop: 1 }} value={2} readOnly />
  
  
                    <Stack spacing={1} style={{
                      marginTop: 5
                    }}>
                      <Button variant="contained" style={{
                        borderRadius: 0
                      }}>Read more</Button>
                      <Button style={{
                        borderRadius: 0
                      }} 
                      onClick={(e)=>{e.preventDefault(); dispatch(watchListAdd(props.info)); setInWatchList(true)}}
                      variant="light">
                        {inWatchList?'Remove from Watchlist':'Add to Watchlist'}</Button>
                    </Stack>
                  </div>
  
                </div>
  
              </Fade>
  
            </div>
          </div>
        </AspectRatioBox>
      </Box>
  
    )
  }


export {VMovieCard}