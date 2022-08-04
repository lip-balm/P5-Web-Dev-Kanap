// URLSearchParams for API product display
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pageID = urlParams.get('id');
console.log(pageID);

// Fetch products from API
fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(product => contentProductPages(product));

// Get access to the DOM
const itemsSection = document.getElementsByClassName('items');
const productPageTitle = document.querySelector('title');
const productTitle = document.getElementById('title');
const productPrice = document.getElementById('price');
const productPageDescription = document.getElementById('description');
const productPageImageDiv = document.getElementsByClassName('item__img')[0];
const productColors = document.getElementById('colors');
const productQuantity = document.getElementById('quantity');

// Content the each product page with respective information
function contentProductPages(product) {
    for (let i = 0; i < product.length; i++) {
        if (product[i]._id === pageID) {
            let productPageImage = document.createElement('img');
            productPageImage.setAttribute('alt', product[i].altTxt);
            productPageImage.setAttribute('src', product[i].imageUrl);
            productPageImageDiv.appendChild(productPageImage);

            productPageTitle.textContent = product[i].name;
            productTitle.textContent = product[i].name;
            productPrice.textContent = product[i].price;
            productPageDescription.textContent = product[i].description;

            colorSelection(product[i].colors);
        }
    }
}

// Function for populating the color dropdown
function colorSelection(colors) {
    console.log(colors);
    for(let i=0; i < colors.length; i++) {  
    const colorSelection = document.createElement('option');
    colorSelection.setAttribute('value', colors[i]);
    colorSelection.textContent = colors[i];
    productColors.appendChild(colorSelection);
    }
}