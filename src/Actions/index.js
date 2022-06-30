

let currentPage = 0;
let currentKeyword = ''
let currentType = ''


const searchAction = (keyword, type)=>{
    currentType=type;
    currentKeyword=keyword;
    currentPage+=1
    return {
        type:'SEARCH',
        payload:{
            keyword:currentKeyword,
            type: currentType,
            page: currentPage,
        }
    }
}

const searchGenreAction = (genres, type)=>{
    currentPage+=1

    return {
        type:'SEARCH_GENRE',
        payload:{
            genres,
            type,
            page:currentPage
        }
    }
}


const searchWordAction = (keyword)=>{
    return {
        type:'SET',
        payload:keyword
    }
}

const moreSearchAction = ()=>{
    currentPage+=1
    return {
        type:'SEARCH',
        payload:{
            keyword:currentKeyword,
            type: currentType,
            page: currentPage
        }
    }
}

const getBucket = ()=>{
    return {
        type:'GET'
    }
}

const appendBucket = (new_bucket)=>{
    return {
        type:'APPEND',
        payload:new_bucket
    }
}

const overideBucket = (new_bucket)=>{
    return {
        type:'OVERIDE',
        payload:new_bucket
    }
}

const clearBucket = ()=>{
    return {
        type:'CLEAR'
    }
}

const toggleLoading = (new_state)=>{
    return {
        type:'TOGGLE',
        payload:new_state
    }
}

const watchListAdd = (info)=>{
    return {
        type:'ADD',
        payload:info
    }
}

const changeDefaultType = (media_type)=>{
    return {
        type:'CHANGE_TYPE',
        payload:media_type
    }
}

const updateGenres = (selectedGenres)=>{
    return {
        type:'UPDATE_GENRES',
        payload:selectedGenres
    }
}

const updateCurrentCall = (cc, page)=>{
    return {
        type:'SET_CC',
        payload:{
            page,
            cc}
    }
}

export {searchAction, updateCurrentCall, changeDefaultType, searchGenreAction, moreSearchAction, getBucket, appendBucket, overideBucket, clearBucket, toggleLoading, searchWordAction, watchListAdd, updateGenres}