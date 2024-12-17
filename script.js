document.addEventListener('DOMContentLoaded', function () {
    const cartItems = [];
    const cartElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeButton = document.querySelector('.close-button');
    const checkoutForm = document.getElementById('checkout-form');
    const orderSummaryElement = document.getElementById('order-summary');
    const summaryTotalPriceElement = document.getElementById('summary-total-price');
    const cancelOrderButton = document.getElementById('cancel-order');

    const updateCart = () => {
        cartElement.innerHTML = '';
        let total = 0;
        
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.quantity}x ${item.name} - R$${(item.price * item.quantity).toFixed(2)}`;
            cartElement.appendChild(li);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total.toFixed(2);
        summaryTotalPriceElement.textContent = total.toFixed(2);
        checkoutButton.disabled = cartItems.length === 0;
    };

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('change', function () {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const quantityInput = this.closest('.item').querySelector('.item-quantity');
            const quantity = parseInt(quantityInput.value);
            const existingItem = cartItems.find(cartItem => cartItem.name === name);

            if (this.checked) {
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cartItems.push({ name, price, quantity });
                }
            } else {
                const index = cartItems.indexOf(existingItem);
                cartItems.splice(index, 1);
            }

            updateCart();
        });
    });

    document.querySelectorAll('.item-quantity').forEach(quantityInput => {
        quantityInput.addEventListener('change', function () {
            const checkbox = this.closest('.item').querySelector('.menu-item');
            const name = checkbox.dataset.name;
            const price = parseFloat(checkbox.dataset.price);
            const quantity = parseInt(this.value);
            const existingItem = cartItems.find(cartItem => cartItem.name === name);

            if (checkbox.checked) {
                if (existingItem) {
                    existingItem.quantity = quantity;
                }
            }

            updateCart();
        });
    });

    checkoutButton.addEventListener('click', function () {
        checkoutModal.style.display = 'flex';
        orderSummaryElement.innerHTML = '';
        
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.quantity}x ${item.name} - R$${(item.price * item.quantity).toFixed(2)}`;
            orderSummaryElement.appendChild(li);
        });
    });

    closeButton.addEventListener('click', function () {
        checkoutModal.style.display = 'none';
    });

    checkoutForm.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Pedido confirmado! Obrigado pela compra.');
        location.reload(); // Reinicia o sistema após a confirmação do pedido.
    });

    cancelOrderButton.addEventListener('click', function () {
        if (confirm('Tem certeza que deseja cancelar o pedido?')) {
            location.reload(); // Reinicia o sistema após o cancelamento.
        }
    });
});
