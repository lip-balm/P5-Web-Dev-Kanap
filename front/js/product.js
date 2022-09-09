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
const addToCartButton = document.getElementById('addToCart');

// Content each product page with its respective information
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

// Populating the color dropdown
function colorSelection(colors) {
    console.log(colors);
    for (let i = 0; i < colors.length; i++) {  
    const colorSelection = document.createElement('option');
    colorSelection.setAttribute('value', colors[i]);
    colorSelection.textContent = colors[i];
    productColors.appendChild(colorSelection);
    }
}

// Add to cart function
function addToCart() {
    const productPageImage = productPageImageDiv.getElementsByTagName('img')[0].src;
    // Object to hold the product details
    let productSelection = {
        productTitle: productTitle.textContent,
        pageID: pageID,
        selectedQuantity: productQuantity.value,
        selectedColor: productColors.value,
        // productPrice: productPrice.textContent,
        productImage: productPageImage,
    };
    console.log(productSelection);

    let currentCart = localStorage.getItem('cartProductsArray');
    if (currentCart == null) {
        cartProductsArray = [];
    } else {
        cartProductsArray = JSON.parse(currentCart);
    }
    console.log(cartProductsArray);

    // Find if product exists in cart
    const existingProduct = cartProductsArray.findIndex((newProduct) => newProduct.pageID == pageID && newProduct.selectedColor == productColors.value);
    console.log(existingProduct);

    // If cart is empty, add the product or if index is true, then increase the quantity.
    if (cartProductsArray.length === 0 && ((productColors.value != "") && (productQuantity.value != 0))) {
        cartProductsArray.push(productSelection);
        localStorage.setItem('cartProductsArray', JSON.stringify(cartProductsArray));
        console.log(cartProductsArray);

    } else if (existingProduct >= 0 && ((productColors.value != "") && (productQuantity.value != 0))) {
        cartProductsArray[existingProduct].selectedQuantity = Number(productSelection.selectedQuantity) + Number(cartProductsArray[existingProduct].selectedQuantity); 
        localStorage.setItem('cartProductsArray', JSON.stringify(cartProductsArray));
        console.log(existingProduct);

    // If cart is not empty or product does not exist in cart, then add it to cart
    } else if ((productColors.value != "") && (productQuantity.value != 0)) {
        cartProductsArray.push(productSelection);
        localStorage.setItem('cartProductsArray', JSON.stringify(cartProductsArray));

    // Show an alert if selection is invalid  
    } else {
        alert('You must make a valid selection for both color and quantity to add this item to cart!');
    }
};

// Use above function on click of add to cart button
addToCartButton.addEventListener('click', addToCart);