const orderId = document.getElementById('orderId');

let confirmedOrderId = sessionStorage.getItem('orderId');
orderId.textContent = confirmedOrderId;

localStorage.clear();
sessionStorage.clear();