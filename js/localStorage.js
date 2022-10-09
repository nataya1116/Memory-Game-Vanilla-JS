const KEY = "ranking";


function getLocalStorage(key){
    return localStorage.getItem(key);
}

function setLocalStorage(key, jsonString){
    localStorage.setItem(key, jsonString);
}