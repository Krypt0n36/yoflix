

const genres = [{"id":12,"name":"Adventure"},{"id":14,"name":"Fantasy"},{"id":16,"name":"Animation"},{"id":18,"name":"Drama"},{"id":27,"name":"Horror"},{"id":28,"name":"Action"},{"id":35,"name":"Comedy"},{"id":36,"name":"History"},{"id":37,"name":"Western"},{"id":53,"name":"Thriller"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":878,"name":"Science Fiction"},{"id":9648,"name":"Mystery"},{"id":10402,"name":"Music"},{"id":10749,"name":"Romance"},{"id":10751,"name":"Family"},{"id":10752,"name":"War"},{"id":10770,"name":"TV Movie"}]


function binarySearch(arr, x, start, end) {
      
    // Base Condition
    if (start > end) return -1;
  
    // Find the middle index
    let mid=Math.floor((start + end)/2);
  
    // Compare mid with given key x
    if (arr[mid].id===x) return mid;
         
    // If element at mid is greater than x,
    // search in the left half of mid
    if(arr[mid].id > x)
        return binarySearch(arr, x, start, mid-1);
    else
 
        // If element at mid is smaller than x,
        // search in the right half of mid
        return binarySearch(arr, x, mid+1, end);
}

function getGenreName(genre_id){
    const index = binarySearch(genres, genre_id, 0, genres.length);
    if(index>=0){
        return genres[index]['name']
    }
    else{
        return 'Genre not found'
    }
}

export {genres, getGenreName}