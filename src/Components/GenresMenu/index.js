import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Chip, IconButton } from '@mui/material';
import {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchGenreAction, updateGenres } from '../../Actions';
import { searchByGenre } from '../../Utils/api';
import { genres } from '../../Utils/genres';

export default function GenresMenu({ w }) {
    const menu = useRef()
    const [leftShadowHidden, hideLeftShadow] = useState(true)
    const dispatch = useDispatch()
    const genresState = useSelector(state=>state.genres)
    const [selectedGenres, setSelectedGenres] = useState(genresState)

    useEffect(()=>{
        //console.log(selectedGenres)
        dispatch(searchByGenre(selectedGenres, 'movie'))
    }, [selectedGenres])


    function onGenreSelect(genreId){
        // check if exists
        const pos = selectedGenres.indexOf(genreId);
        let new_selectedGenres = [...selectedGenres];

        if(pos>=0){
            // genre already added, remove it
            new_selectedGenres[pos] = null;
        }
        else{
            const empty_place = new_selectedGenres.indexOf(null);
            if(empty_place>=0){
                new_selectedGenres[empty_place] = genreId;
            }else{
                new_selectedGenres.push(genreId)
            }
        }
        setSelectedGenres(new_selectedGenres)
        dispatch(updateGenres(new_selectedGenres))

    }
    return (
        <div style={{ width: '100%', display: 'inline-flex', marginBottom: 20, position: 'relative' }} >
            <div style={{ height: '100%', width: 20, position: 'absolute', right: 74, background: 'linear-gradient(to left, white, transparent)', zIndex: 5 }}></div>
            {!leftShadowHidden && <div style={{ height: '100%', width: 20, position: 'absolute', left: 0, background: 'linear-gradient(to right, white, transparent)', zIndex: 5 }}></div>}
            <div style={{ width: 'CALC(100% - 74px)', display: 'inline-flex', overflowX: 'hidden', scrollBehavior: 'smooth', position: 'relative' }} ref={menu} >
                {genres.map(item => <Chip  label={item.name} variant={selectedGenres.indexOf(item.id)>=0?"filled":"outlined"} onClick={(e)=>{e.preventDefault(); onGenreSelect(item.id)}} key={item.id} style={{ marginRight: 5 }}></Chip>)}
            </div>
            <IconButton aria-label="delete" size="small" style={{ width: 32, height: 32, marginRight: 2 }} onClick={() => { if (menu.current.scrollLeft < 50) { hideLeftShadow(true) } menu.current.scrollLeft -= 100 }}>
                <ArrowBackIosNew fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete" size="small" style={{ width: 32, height: 32 }} onClick={() => { if (menu.current.scrollLeft > 0) { hideLeftShadow(false) } menu.current.scrollLeft += 100 }} >
                <ArrowForwardIos fontSize="small" />
            </IconButton>
        </div>
    );
}