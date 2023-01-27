function saveFavoriteToLocalStorage(location){
    let favorites = getLocalStorage();

    favorites.push(location);

    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

function getLocalStorage(){
    let localStorageData = localStorage.getItem('Favorites');

    if(localStorageData === null){
        return [];
    }
    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(location){
    let favorites = getLocalStorage();

    let locationIndex = favorites.indexOf(location);

    favorites.splice(locationIndex, 1);

    localStorage.setItem('Favorites', JSON.stringify(favorites))
}

export { saveFavoriteToLocalStorage, getLocalStorage, removeFromLocalStorage };