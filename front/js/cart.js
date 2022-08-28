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

// Modifications of product quantities in cart

const newQuantity = Array.from(document.getElementsByClassName('itemQuantity'))

newQuantity.forEach((item, index) => {
    item.addEventListener('change', function modifyCartContents() {
        const product = item.closest('article');
        const quantity = product.getElementsByClassName('itemQuantity')[0].value;
        if (quantity <= 0 || quantity > 100) {
            alert('Sorry, minimum quantity allowed is 1 and maximum is 100! Please use the delete option if you wish to remove this item.');
            location.reload();
        } else {
            currentCart[index].selectedQuantity = quantity;
            localStorage.setItem('cartProductsArray', JSON.stringify(currentCart));
            location.reload();
        }
    });}); 

// Delete products in cart

const itemDelete = Array.from(document.getElementsByClassName('deleteItem'));

itemDelete.forEach((item, index) => {
    item.addEventListener('click', function deleteCartItem() {
        const itemToDelete = item.closest('article');
        const itemToBeDeleted = itemToDelete.getElementsByClassName('deleteItem')[0];
        itemToBeDeleted.remove();

        currentCart.splice(index, 1);
        localStorage.setItem('cartProductsArray', JSON.stringify(currentCart));
        location.reload();
        }
)
});

// Confirming the order
const firstName = document.getElementById('firstName');
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
const lastName = document.getElementById('lastName');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
const address = document.getElementById('address');
const addressErrorMsg = document.getElementById('addressErrorMsg');
const city = document.getElementById('city');
const cityErrorMsg = document.getElementById('cityErrorMsg');
const email = document.getElementById('email');
const emailErrorMsg = document.getElementById('emailErrorMsg');
const orderButton = document.getElementById('order');

let validFirstName= false;
let validLastName = false;
let validAddress = false;
let validCity = false;
let validEmail = false;

// Validate name
var regName = /^[0-9A-Za-z\s\-']+$/;

firstName.addEventListener('blur', () => {
    if (regName.test(firstName.value)) {
        firstNameErrorMsg.textContent = 'Great name :)';
        firstNameErrorMsg.style.color = 'lightgreen';
        validFirstName = true;
    } else {
        firstNameErrorMsg.textContent = 'Please input a valid name.';
        firstNameErrorMsg.style.color = 'pink';
    }
    console.log(validFirstName);
});

lastName.addEventListener('blur', () => {
    if (regName.test(lastName.value)) {
        lastNameErrorMsg.textContent = 'Cool!';
        lastNameErrorMsg.style.color = 'lightgreen';
        validLastName = true;
    } else {
        lastNameErrorMsg.textContent = 'Please input a valid name.';
        lastNameErrorMsg.style.color = 'pink';
    }
    console.log(validLastName);
});

// Validate addres
var regAddress = /^\s*\S+(?:\s+\S+){2}/;
var regCity = /(^|\s)[a-zA-Z',.-\s]{1,25}(?=\s|$)((?!\W)[a-zA-Z',.-\s]{1,25}(?=\s|$))?/g;

address.addEventListener('blur', () => {
    if (regAddress.test(address.value)) {
        addressErrorMsg.textContent = 'Your order will be sent here!';
        addressErrorMsg.style.color = 'lightgreen';
        validAddress = true;
    } else {
        addressErrorMsg.textContent = 'Please double check your address.';
        addressErrorMsg.style.color = 'pink';
    }
    console.log(validAddress);
});

city.addEventListener('blur', () => {
    if (regCity.test(city.value)) {
        cityErrorMsg.textContent = 'Great city!';
        cityErrorMsg.style.color = 'lightgreen';
        validCity = true;
    } else {
        cityErrorMsg.textContent = 'Please double check your city';
        cityErrorMsg.style.color = 'pink';
    }
    console.log(validCity);
});

// Validate email
var regEmail = /\S+@\S+\.\S+/g;

email.addEventListener("change", () => {
    if (regEmail.test(email.value)) {
        emailErrorMsg.textContent = 'Order confirmation and updates coming shortly!';
        emailErrorMsg.style.color = 'lightgreen';
        validEmail = true;
    } else {
        emailErrorMsg.textContent = 'Please input a valid email.';
        emailErrorMsg.style.color = 'pink';
    }
    console.log(validEmail);
});

// Order confirmation
orderButton.addEventListener('click', (event) => {
    if ((validFirstName && validLastName && validAddress && validCity && validEmail) && (currentCart.length != 0)) {
        event.preventDefault();

        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        };

        let products = [];
        currentCart.forEach(pageID => products.push(pageID.pageID));

        let order = {
            contact,
            products,
        };

        console.log(JSON.stringify({contact: contact, products: products}));

        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(order),
        })
        // .then(response => console.log(response.json())).catch(error => console.log(error))
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('orderId', data.orderId)
            window.location.href = "confirmation.html" + "?id=" + data.orderId;
        });
    } else {
        alert('Something is wrong! Please review your information or cart contents. You may also contact us for assistance.');
        event.preventDefault();
    }
})