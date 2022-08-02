// Fetch products from API
fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(product => displayItems(product));

// Get access to the DOM
const itemsSection = document.getElementById('items');

// Create product elements, set its contents, and populate on the page
function displayItems(product) {
    for (let i = 0; i < product.length; i++) {
        let productLink = document.createElement('a');
        let productArticle = document.createElement('article');
        let productImage = document.createElement('img');
        let productHeading = document.createElement('h3');
        let productDescription = document.createElement('p');

        productLink.setAttribute('href', './product.html?id=' + product[i]._id);
        productImage.setAttribute('alt', product[i].altTxt);
        productImage.setAttribute('src', product[i].imageUrl);
        productHeading.textContent = product[i].name;
        productDescription.textContent = product[i].description;
        
        // Append children to their respective parents
        productArticle.appendChild(productImage);
        productArticle.appendChild(productHeading);
        productArticle.appendChild(productDescription);
        productLink.appendChild(productArticle);
        itemsSection.appendChild(productLink);
    }
    let productArray = product[i];
    return productArray;
}