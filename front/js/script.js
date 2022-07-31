// Fetch products from API
fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(product => displayItems(product));

// Get access to the DOM
const itemsSection = document.getElementById('items');

// The below's function is to     
function displayItems(product) {
    for (let i = 0; i < product.length; i++) {
        console.log(product[i]);

        let productArray = product[i];
        console.log(productArray)
    }
}

//Create elements for the products and set their attributes
function createProducts(product) {
    let productLink = document.createElement('a');
    let productArticle = document.createElement('article');
    let productImage = document.createElement('img');
    let productHeading = document.createElement('h3');
    let productDescription = document.createElement('p');

    productLink.setAttribute('');
    productArticle.setAttribute('');
    productImage.setAttribute('');
    productHeading.textContent = product[i].name;
    productDescription.textContent = '';
}

// Append children to the products
productLink.appendChild(productArticle);
productArticle.appendChild(productImage);
productArticle.appendChild(productHeading);
productArticle.appendChild(productDescription);

itemsSection.appendChild(newProductLink);