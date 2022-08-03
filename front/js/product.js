// URLSearchParams for API product display
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pageID = urlParams.get('id');

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

// original Create product elements, set its contents, and populate on the page
function contentProductPages(product) {
    for (let i = 0; i < product.length; i++) {
        const productPageImage = document.createElement('img');
        /*var imageDiv = document.createElement('div'); 
        imageDiv.className = 'imageDiv';*/
        
        productPageTitle.textContent = product[i].name;
        productPageImage.setAttribute('alt', product[i].altTxt);
        productPageImage.setAttribute('src', product[i].imageUrl);
        productTitle.textContent = product[i].name;
        productPrice.textContent = product[i].price;
        productPageDescription.textContent = product[i].description;

        /* imageDiv.appendChild('productPageImageDiv'); */
        productPageImageDiv.appendChild('productPageImage');
    }
}

function colorSelection(colors) {
    for(let i=0; i < colors.length; i++) {  
    const colorSelection = document.createElement('option');
    colorSelection.setAttribute('value', product.colors[i]);
    colorSelection.textContent = product.colors[i];
    productColors.appendChild(colorSelection);
    }
}