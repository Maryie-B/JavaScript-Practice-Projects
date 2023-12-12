const resultsNAv = document.getElementById('resultsNav');
const favoritesNAv = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function createDOMNodes(page) {
    const currentArray = page === 'results' ? resultsArray : Object.values(favorites); 
    currentArray.forEach((result) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View full Image';
        link.target = '_blank';

        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA Picture of the Day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;

        const saveTExt = document.createElement('p');
        saveTExt.classList.add('clickable');
        if (page === 'results') {
            saveTExt.textContent = 'Add to Favorties';
            saveTExt.setAttribute('onclick', `saveFavorite('${result.url}')`);
        } else {
            saveTExt.textContent = 'Remove from Favorties';
            saveTExt.setAttribute('onclick', `removeFavorite('${result.url}')`);
        }

        const textCard = document.createElement('p');
        textCard.textContent = result.explanation;

        const footer = document.createElement('small');
        footer.classList.add('text-muted');

        const date = document.createElement('strong');
        date.textContent = result.date;

        const copyright = document.createElement('span');
        const copyrightResult = result.copyright === undefined ? '' : result.copyright;
        copyright.textContent = ` ${copyrightResult}`;

        footer.append(date, copyright);
        cardBody.append(cardTitle, saveTExt, textCard, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    });
}

function showContent(page) {
    window.scrollTo( {top: 0, behavior: 'instant' }); 
    if (page === 'results') {
        resultsNAv.classList.remove('hidden');
        favoritesNAv.classList.add('hidden');
    } else {
        resultsNAv.classList.add('hidden');
        favoritesNAv.classList.remove('hidden');
    }
    loader.classList.add('hidden'); 
}

function updateDOM(page) {
    if (localStorage.getItem('nasaFavorites')) {
        favorites = JSON.parse(localStorage.getItem('nasaFavorites')); 
    }
    imagesContainer.textContent = '';
    createDOMNodes(page);
    showContent(page);
}



async function getNasaPictures() {
    loader.classList.remove('hidden'); 
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        updateDOM('results');
    } catch (error) {
        console.log('Error');
    }
}

function saveFavorite(itemUrl) {
    resultsArray.forEach((item) => {
        if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
            favorites[itemUrl] = item;
            saveConfirmed.hidden = false;
            setTimeout(() => {
                saveConfirmed.hidden = true;
            }, 2000);
            localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        }
    });
}

function removeFavorite(itemUrl) {
    if (favorites[itemUrl]) {
        delete favorites[itemUrl];
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites)); 
        updateDOM('favorites'); 
    }
}

getNasaPictures();