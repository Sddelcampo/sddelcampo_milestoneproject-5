"use strict";
document.addEventListener("DOMContentLoaded", function () {
    /**
     * Updates the total price for a specific cart item and calculates the subtotal.
     * @param {number} itemIndex - The index of the item in the cart.
     * @param {number} price - The price of the item.
     */
    function updatePrices(itemIndex, price) {
        
        const quantityInput = document.querySelector("#quantity" + itemIndex);
        const quantity = parseInt(quantityInput.value);
        //Ensures that up to 2 decimal points gets calculated
        const itemTotal = (quantity * price).toFixed(2);

        // Updates total
        document.querySelector("#total" + itemIndex).textContent = "$" + itemTotal;

        // Updates subtotal
        updateSubtotal();
    }

    /**
     * Calculates the subtotal, tax, and total for entire purchase, then updates to webpage
     */
    function updateSubtotal() {
        let subtotal = 0;

        // Calculates subtotal
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(item => {
            const totalElement = item.querySelector('.cart-item-details span[id^="total"]');
            const totalPrice = parseFloat(totalElement.textContent.replace('$', ''));
            subtotal += totalPrice;
        });

        // Updates subtotal
        document.querySelector('#subtotal').textContent = "$" + subtotal.toFixed(2);

        // Calculate and update tax and total
        const taxRate = 0.0675;
        const serviceFee = 5.00;
        const tax = (subtotal * taxRate).toFixed(2);
        const total = (subtotal + parseFloat(tax) + serviceFee).toFixed(2);

        document.querySelector('#tax').textContent = "$" + tax;
        document.querySelector('#total').textContent = "$" + total;
    }

    /**
     * Assigns event listeners to update buttons so that when clicked the prices are
     * calculated and then updated.
     */
    const updateButtons = document.querySelectorAll('.update-button');

    updateButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemIndex = this.getAttribute('data-item');
            const itemPrice = parseFloat(this.getAttribute('data-price'));
            updatePrices(itemIndex, itemPrice);
        });
    });
});

async function loadProducts() {
    const response = await fetch('/shop/products');
    const products = await response.json();
  
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = '';
  
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <h2>${product.name}</h2>
        <p>Price: $${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productContainer.appendChild(productDiv);
    });
  }
  
  async function addToCart(productId) {
    await fetch('/shop/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    alert('Product added to cart!');
  }
  
  loadProducts();