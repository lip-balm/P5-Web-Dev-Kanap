// Get access to cart section and also the array from local storage
const cartItems = document.getElementById('cart__items');
let currentCart = JSON.parse(localStorage.getItem('cartProductsArray'));

// Function to actually show the array
if (currentCart == null) {
    let emptyCartMessage = document.createElement('p');
    emptyCartMessage.innerText = 'Your cart is empty!';
    cartItems.appendChild(emptyCartMessage);
} else {
    for (let i in currentCart) {
        // Create article for the cart item section
        let cartProductsArticle = document.createElement('article');
        cartProductsArticle.className = 'cart__item';
        cartProductsArticle.setAttribute('data-id', currentCart[i].pageID);
        cartProductsArticle.setAttribute('data-color', currentCart[i].selectedColor);
        
        // Create the first div (to hold img) for the above article
        let cartProductsImageDiv = document.createElement('div');
        cartProductsImageDiv.className = 'cart__item__img';
        let cartProductImage = document.createElement('img');
        cartProductImage.setAttribute('alt', currentCart[i].altTxt);
        cartProductImage.setAttribute('src', currentCart[i].productImage);

        cartProductsImageDiv.appendChild(cartProductImage);
        
        // Create the second div (to hold details)
        let cartProductsContent = document.createElement('div');
        cartProductsContent.className = 'cart__item__content';

        // Create first section of second div (to hold description)
        let cartProductsDescription = document.createElement('div');
        cartProductsDescription.className = 'cart__item__content__description';
        let cartProductName = document.createElement('h2');
        let cartProductColor = document.createElement('p');
        let cartProductPrice = document.createElement('p');

        cartProductName.textContent = currentCart[i].productTitle;
        cartProductColor.textContent = currentCart[i].selectedColor;
        cartProductPrice.textContent = '€' + Number(currentCart[i].productPrice);
        
        cartProductsDescription.appendChild(cartProductName);
        cartProductsDescription.appendChild(cartProductColor);
        cartProductsDescription.appendChild(cartProductPrice);

        // Create the second section of second div (to hold quantity)
        let cartProductSettings = document.createElement('div');
        cartProductSettings.className = 'cart__item__content__settings';

        let cartProductQuantity = document.createElement('div');
        cartProductQuantity.className = 'cart__item__content__settings__quantity';
        let cartProductQuantityLabel = document.createElement('p');
        let cartProductQuantityInput = document.createElement('input');

        cartProductQuantityLabel.textContent = 'Qté : ';
        cartProductQuantityInput.setAttribute('type', 'number');
        cartProductQuantityInput.className = 'itemQuantity';
        cartProductQuantityInput.setAttribute('name', 'itemQuantity');
        cartProductQuantityInput.setAttribute('min', 1);
        cartProductQuantityInput.setAttribute('max', 100);
        cartProductQuantityInput.setAttribute('value', currentCart[i].selectedQuantity);

        cartProductQuantity.appendChild(cartProductQuantityLabel);
        cartProductQuantity.appendChild(cartProductQuantityInput);

        // Create the last section of the second div (to delete)
        let cartProductsDelete = document.createElement('div');
        cartProductsDelete.className = 'cart__item__content__settings__delete';
        let cartProductsDeleteItem = document.createElement('p');
        cartProductsDeleteItem.className = 'deleteItem';
        cartProductsDeleteItem.textContent = 'Delete';

        cartProductsDelete.appendChild(cartProductsDeleteItem);
        
        cartProductSettings.appendChild(cartProductQuantity);
        cartProductSettings.appendChild(cartProductsDelete);

        // Append smaller divs to broader content div
        cartProductsContent.appendChild(cartProductsDescription);
        cartProductsContent.appendChild(cartProductSettings);

        // Append smaller divs to broader cart product article        
        cartProductsArticle.appendChild(cartProductsImageDiv);
        cartProductsArticle.appendChild(cartProductsContent);

        cartItems.appendChild(cartProductsArticle);
    }
};

// Get access to DOM elements for the summary and display total price + quantity
const cartSummary = document.getElementsByClassName('cart__price');
const cartTotalQuantity = document.getElementById('totalQuantity');
const cartTotalPrice = document.getElementById('totalPrice');

let cartSum = 0;
for (let i = 0; i < currentCart.length; i++) {
    cartSum += Number(currentCart[i].selectedQuantity);
};

let cartPrice = 0;
for (let i = 0; i < currentCart.length; i++) {
    cartPrice += Number(currentCart[i].productPrice) * Number(currentCart[i].selectedQuantity); 
};

cartTotalQuantity.textContent = cartSum;
cartTotalPrice.textContent = cartPrice.toLocaleString('fr-FR');

// Modifications products in cart

const newQuantity = Array.from(document.getElementsByClassName('itemQuantity'))

newQuantity.forEach((item, index) => {
    item.addEventListener('change', function modifyCartContents() {
        const product = item.closest('article');
        const quantity = product.getElementsByClassName('itemQuantity')[0].value;
        if (quantity <= 0) {
            alert('Sorry, zero or negative quantities are not allowed! Please use delete the item if you wish to remove it.');
            location.reload();
        } else {
            currentCart[index].selectedQuantity = quantity;
            localStorage.setItem('cartProductsArray', JSON.stringify(currentCart));
            location.reload();
        }
    });}); 

// Removal of products in cart part 1






// let itemDelete = document.getElementsByClassName('deleteItem')[0];
// console.log(itemDelete);

// function deleteCartItem () {
//     for (let i = 0; i < currentCart.length; i++) {
//         let itemtoRemove = cartItems.closest('article')[i];
//         console.log(itemtoRemove);

//         const unwantedProduct = cartProductsArray.findIndex(thisProduct => thisProduct.pageID == itemtoRemove.dataset.id && thisProduct.selectedColor == itemtoRemove.dataset.color);
//         console.log(unwantedProduct);
        
//         // localStorage.removeItem();
//         localStorage.setItem('cartProductsArray', JSON.stringify(cartProductsArray));
//         location.reload();
//     }
// };

// itemDelete.addEventListener('click', deleteCartItem);

// Removal of products in cart part 2
// let itemDelete = document.getElementsByClassName('deleteItem');

// itemDelete.addEventListener('click', () => {
//     const itemToDelete = cartProductsArray.findIndex((unwantedProduct) => unwantedProduct.pageID == currentCart.dataset.id && unwantedProduct.selectedColor == currentCart.dataset.color);
//     console.log(itemToDelete)

//     localStorage.setItem('cartProductsArray', JSON.stringify(cartProductsArray));
//     location.reload();
// });

// function deleteCartItem () {
//     for (let i = 0; i < cartProductsDeleteItem.length; i++) {
//         let itemtoRemove = cartProductsDeleteItem.closest('article');


//         console.log(unwantedProduct);
        
//         localStorage.removeItem(itemtoRemove);

//     }

// };

