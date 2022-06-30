import { combineReducers } from "redux"
import { searchByGenre, searchByName } from "../Utils/api"



const searchReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SEARCH': {
            searchByName(action.payload.keyword, action.payload.type || 'multi', action.payload.page)
            return 1
        }
        case 'SEARCH_GENRE':
            {
                searchByGenre(action.payload.genres, action.payload.type, action.payload.page)
                return 1
            }

        default:
            return state
    }
}


const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE':
            return true;
        default:
            return state
    }
}



const searchKeywordReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET':
            return action.payload;
        default:
            return state
    }
}

const bucketReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET':
            return state;
        case 'APPEND':
            return [
                ...state,
                action.payload
            ]
        case 'OVERIDE':
            return action.payload;
        case 'CLEAR':
            return [];
        default:
            return state
    }
}


const watchlistReducer = (state = JSON.parse(localStorage.getItem('watchlist')), action) => {
    if (state == null || !state) {
        localStorage.setItem('watchlist', '[]')
    }
    switch (action.type) {
        case 'ADD': {
            const new_list = JSON.parse(localStorage.getItem('watchlist')).concat([action.payload])
            localStorage.setItem('watchlist', JSON.stringify(new_list));
            return new_list
        }
        default: {
            return JSON.parse(localStorage.getItem('watchlist'));
        }
    }
}

const mediaType = (state='movie', action)=>{
    switch(action.type){
        case 'CHANGE_TYPE':
            return action.payload;
        default:
            return state
    }
}

const selectedGenres = (state=[], action)=>{
    switch(action.type){
        case 'UPDATE_GENRES':
            return action.payload
        default:
            return state
    }
}

const currentCall = (state='', action)=>{
    switch(action.type){
        case 'SET_CC':
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    search: searchReducer,
    bucket: bucketReducer,
    loading: loadingReducer,
    searchKeyword: searchKeywordReducer,
    watchlist: watchlistReducer,
    media:mediaType,
    genres:selectedGenres,
    currentCall
});
