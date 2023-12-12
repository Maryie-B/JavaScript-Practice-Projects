const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unspalsh API
const count = 15;
const apiKey = '9yk8yMEpklVzcYAdpw3g_Zapv7gf2o7yHVGxqi2HCxo';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set the attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Check if all images were loaded
function imageLoaded() {
    console.log(imagesLoaded);
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

// Create elements for links and photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
// Run a for each function for every object in teh array
    photosArray.forEach((photos) => {
        // create <a> to link to Unspash
        const item = document.createElement('a');
        // item.setAttribute('href', photos.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photos.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photos.urls.regular);
        // img.setAttribute('alt', photos.alt_description);
        // img.setAttribute('title', photos.alt_description);
        setAttributes(img, {
            src: photos.urls.regular,
            alt: photos.alt_description,
            title: photos.alt_description,
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put the <img> into the <a> then put both inside imageContainer El
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error here
    }
}

// Check to see if scrooling dear the bottom of the page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();
