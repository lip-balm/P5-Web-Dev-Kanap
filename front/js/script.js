// Fetch products from API
fetch ('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(productInfo => displayItems(productInfo));

function displayItems()