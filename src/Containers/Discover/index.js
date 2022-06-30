import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Box } from '@mui/system';
import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import GenresMenu from '../../Components/GenresMenu';
import {VMovieCard} from './../../Components/MovieCard';
import { Error } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction, searchGenreAction } from '../../Actions';
import { searchByName } from '../../Utils/api';


function Discover() {
    //const [bucket, setBucket] = useState([]);
    const bucket = useSelector(state=>state.bucket)
    const loading = useSelector(state=>state.loading)
    const searchKeyword = useSelector(state=>state.searchKeyword)
    const scrollerRef = useRef(null)
    const [pageHeight, setPageHeight] = useState(window.innerHeight);
    const [pageWidth, setPageWidth] = useState(window.innerWidth)
    const [error, setError] = useState(false)
    const [slice, setSlice] = useState(1)
    const [working, setWorking] = useState(false)
    const [g, setG] = useState(6)
    const dispatch = useDispatch()
  
  
   

    function syncDim(){
      if(window.innerWidth < 400){
        setG(6)
      }else if(window.innerWidth < 600){
        setG(4)          
      }
      else if(window.innerWidth < 800){
        setG(4)
      }
      else if(window.innerWidth < 1200){
        setG(4)
      }
      else if(window.innerWidth > 1200){
        setG(3)
      }
    }
    useEffect(() => {
      //fetchBucket()
      
      //dispatch(searchGenreAction([18], 'movie'))

      syncDim()
      window.addEventListener('resize', () => {

        syncDim()

        setPageWidth(window.innerWidth)
        setPageHeight(window.innerHeight)
      });
      return () => {
        try{
          window.removeEventListener('resize', () => { })
        }catch{}
        
      };
    }, [])
    


    useEffect(()=>{
      //fetchBucket()

    }, [slice])
   
  
  
    return (
      <Box style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Stack spacing={2}>
          <Box>
            <div
              style={{
                display: 'inline-flex',
                width: '100%'
              }}
            >
              <Typography variant="h6" style={{ marginBottom: 10 }}>
                
                {(searchKeyword&&searchKeyword.length>0)?`Search results for ${searchKeyword}`:'Discover'}
              </Typography>
              {(false) && <CircularProgress style={{ margin: 'auto', marginRight:0, width:20, height:20 }} />}
            </div>
            <GenresMenu  />
            <div  id="main_container" style={{ overflowY: 'scroll', height: pageHeight - 158, position: 'relative' }} ref={scrollerRef}>
              <div
                style={{
                  width: '100%',
                  background: 'linear-gradient(to bottom, #ffffff85, transparent)',
                  position: 'sticky',
                  top: 0,
                  height: 50,
                }}
              >
              </div>
              <Grid container spacing={1} fullWidth style={{ height: pageHeight - 158, marginTop: -50 }}   >
                {bucket && bucket.map(item => <Grid item xs={g}><VMovieCard info={item} /></Grid>)}
                {loading && <CircularProgress style={{ margin: 'auto' }} />}
                {(error && !loading)&&<Box style={{margin:'auto', textAlign:'center'}}>
                    <Error style={{color:'#dc1b28', width:50, height:50}} />
                    <Typography variant="h6">Network failure, please check your connection.</Typography>    
                    <Button variant="text" style={{marginTop:10}} onClick={()=>{}}>Try again</Button>
                </Box>}
                {(bucket.length > 0)&&<Grid item xs={12} style={{textAlign:'center', paddingTop:10, paddingBottom:10}}>
                  <Button variant="text" style={{margin:'auto'}} onClick={(e)=>{e.preventDefault(); dispatch(searchByName())}} disabled={working}>{working?<CircularProgress style={{ margin: 'auto',width:20, height:20 }} />:'Load More'}</Button>  
                </Grid>}
              </Grid>
            </div>
          </Box>
        </Stack>
      </Box>
    )
  }


export default Discover;