// Fetch products from API
fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(product => contentProductPages(product));

// Get access to the DOM
const itemsSection = document.getElementsByClassName('items');

// Create product elements, set its contents, and populate on the page
function contentProductPages(product) {
    for (let i = 0; i < product.length; i++) {
        const productPageTitle = document.querySelector('title');
        const productTitle = document.getElementById('title');
        const productPrice = document.getElementById('price');
        const productPageDescription = document.getElementById('description');

        const productPageImageDiv = document.getElementsByClassName('item__img');

        const productPageImage = document.createElement('img');

        productPageTitle.textContent = product[i].name;
        productPageImage.setAttribute('alt', product[i].altTxt);
        productPageImage.setAttribute('src', product[i].imageUrl);
        productTitle.textContent = product[i].name;
        productPrice.textContent = product[i].price;
        productPageDescription.textContent = product[i].description;

        productPageImageDiv.appendChild('productPageImage');

    }
    let productPages = product[i];
    return productPages;
}

function colorSelection(colors) {
    for(let i=0; i < colors.length; i++) {  
    const productColors = document.getElementById('colors');
    const colorSelection = docutment.createElement('option');
    colorSelection.setAttribute('value', product[i].colors);



    }
}