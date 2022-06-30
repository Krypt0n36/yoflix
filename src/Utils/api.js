import axios from "axios"
import { overideBucket, searchWordAction, toggleLoading, updateCurrentCall } from "../Actions"

const API_KEY = '050c9271bb810b20fb8022bfb34edbc4'



function searchByName(keyword, type = 'movie', page = 1) {
    return (dispatch, getState) => {
        dispatch(searchWordAction(keyword))
        dispatch(toggleLoading('ON'))
        let url
        if (!keyword) {
            url = getState().currentCall.cc
            page = getState().currentCall.page
        }else{
            url = `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${keyword}`
        }
        url += `&page=${page}`
        dispatch(updateCurrentCall(url, page+1))

        console.log(url)
        axios.get(url)
            .then((resp) => {
                if (resp.status == 200) {
                    console.log(resp.data.results)
                    dispatch(overideBucket(resp.data.results))
                    dispatch(toggleLoading('OFF'))


                } else {
                    dispatch(overideBucket([]))
                    dispatch(toggleLoading('OFF'))
                }
            })
            .catch(err => {
                console.log(err)
                dispatch(overideBucket([]))
                dispatch(toggleLoading('OFF'))
            })
    }
}



function searchByGenre(genre = [], type = 'movie', page = 1) {
    return (dispatch, getState) => {
        console.log(getState().watchlist)
        
        dispatch(toggleLoading('ON'))
        let url 
        if(genre.length==0){
            url = `https://api.themoviedb.org/3/discover/${getState().media}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${getState().genres.join(',')}&with_watch_monetization_types=flatrate`
            
        }else{
            url = `https://api.themoviedb.org/3/discover/${getState().media}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.join(',')}&with_watch_monetization_types=flatrate`
        }

        dispatch(updateCurrentCall(url, page))

        url += `&page=${page}`

        console.log(url)
        axios.get(url)
            .then((resp) => {
                if (resp.status == 200) {
                    dispatch(overideBucket(resp.data.results))
                    dispatch(toggleLoading('OFF'))

                } else {
                    dispatch(overideBucket([]))
                    dispatch(toggleLoading('OFF'))

                }
            })
            .catch(err => {
                console.log(err)
                dispatch(toggleLoading('OFF'))
                dispatch(overideBucket([]))

            })
    }

}

function filterByGenre(genre_id, bucket) {
    let filtered_bucket = []
    for (var i = 0; i < bucket.length; i++) {
        if (bucket[i].genre_ids.indexOf(genre_id) >= 0) {
            filtered_bucket.push(bucket[i])
        }
    }
    return filtered_bucket;
}



export { searchByGenre, searchByName }