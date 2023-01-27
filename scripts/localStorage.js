function saveFavoriteToLocalStorage(location){
    let favorites = getLocalStorage();
    let checker = false;
    for (let i = 0; i < favorites.length; i++){
        if (favorites[i].name == location.name && favorites[i].state == location.state){
            checker = true;
        }
    }

    if (checker == false && favorites[7] == null) {
        favorites.push(location);
    }

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

    for (let i = 0; i < favorites.length; i++){
        if (favorites[i].name == location.name && favorites[i].state == location.state){
            favorites.splice(i, 1);
        }
    }

    localStorage.setItem('Favorites', JSON.stringify(favorites))
}

export { saveFavoriteToLocalStorage, getLocalStorage, removeFromLocalStorage };