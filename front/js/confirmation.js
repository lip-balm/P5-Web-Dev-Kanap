// Get access to the DOM, grab the OrderId, and display it
const orderId = document.getElementById('orderId');

let confirmedOrderId = sessionStorage.getItem('orderId');
orderId.textContent = confirmedOrderId;

localStorage.clear();
sessionStorage.clear();