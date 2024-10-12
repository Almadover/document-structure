document.querySelectorAll('.product__quantity-control').forEach(control => {
    control.addEventListener('click', function() {
        const quantityValueElement = this.parentElement.querySelector('.product__quantity-value');
        let quantity = parseInt(quantityValueElement.textContent);
        if (this.classList.contains('product__quantity-control_inc')) {
            quantity++;
        } else if (this.classList.contains('product__quantity-control_dec') && quantity > 1) {
            quantity--;
        }
        quantityValueElement.textContent = quantity;
    });
});

document.querySelectorAll('.product__add').forEach(button => {
    button.addEventListener('click', function() {
        const productElement = this.closest('.product');
        const productId = productElement.dataset.id;
        const productImage = productElement.querySelector('.product__image').src;
        const quantityValue = parseInt(productElement.querySelector('.product__quantity-value').textContent);
        
        const cart = document.querySelector('.cart__products');
        let cartProduct = cart.querySelector(`.cart__product[data-id="${productId}"]`);

        if (cartProduct) {
            const cartQuantity = cartProduct.querySelector('.cart__product-count');
            cartQuantity.textContent = parseInt(cartQuantity.textContent) + quantityValue;
        } else {
            cartProduct = document.createElement('div');
            cartProduct.classList.add('cart__product');
            cartProduct.setAttribute('data-id', productId);
            cartProduct.innerHTML = `
                <img class="cart__product-image" src="${productImage}">
                <div class="cart__product-count">${quantityValue}</div>
                <span class="btn-remove">x</span>
            `;
            cart.appendChild(cartProduct);
        }

        
        cartProduct.querySelector('.btn-remove').addEventListener('click', function() {
            cartProduct.remove();
        });
    });
});