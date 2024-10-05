const cartContainer = document.querySelector('.cart__products');

function updateLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : {};
}

function displayCart(cart) {
    cartContainer.innerHTML = ''; // Очистить содержимое контейнера
    for (let id in cart) {
        const cartItem = cart[id];
        const cartProduct = document.createElement('div');
        cartProduct.classList.add('cart__product');
        cartProduct.dataset.id = id;
        cartProduct.innerHTML = `
            <img class="cart__product-image" src="${cartItem.image}">
            <div class="cart__product-count">${cartItem.quantity}</div>
            <div class="cart__product-remove">Удалить</div>`;
        cartContainer.appendChild(cartProduct);
    }
}

let cart = loadCart();

displayCart(cart);

document.querySelectorAll('.product__quantity-control').forEach(control => {
    control.addEventListener('click', event => {
        const quantityElement = control.parentElement.querySelector('.product__quantity-value');
        let quantity = parseInt(quantityElement.textContent);
        if (control.classList.contains('product__quantity-control_inc')) {
            quantity += 1;
        } else if (control.classList.contains('product__quantity-control_dec')) {
            if (quantity > 1) {
                quantity -= 1;
            }
        }
        quantityElement.textContent = quantity;
    });
});

document.querySelectorAll('.product__add').forEach(button => {
    button.addEventListener('click', event => {
        const productElement = button.closest('.product');
        const productId = productElement.dataset.id;
        const productImage = productElement.querySelector('.product__image').src;
        const quantity = parseInt(productElement.querySelector('.product__quantity-value').textContent);

        if (cart[productId]) {
            cart[productId].quantity += quantity;
        } else {
            cart[productId] = {
                image: productImage,
                quantity: quantity
            };
        }

        updateLocalStorage(cart);
        displayCart(cart);
    });
});

// Обработчик для удаления товара из корзины
cartContainer.addEventListener('click', event => {
    if (event.target.classList.contains('cart__product-remove')) {
        const cartProduct = event.target.closest('.cart__product');
        const productId = cartProduct.dataset.id;

        delete cart[productId]; // Удаляем товар из корзины
        updateLocalStorage(cart); // Обновляем localStorage
        displayCart(cart); // Обновляем отображение корзины
    }
});