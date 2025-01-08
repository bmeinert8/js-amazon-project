import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity
} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js'


// variable to store the HTML for the cart summary section. This will be built up in the loop below.
let cartSummaryHTML = '';


// Loop through each item in the cart and build up the HTML for the cart summary section.
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId)
      matchingProduct = product;
  });

  cartSummaryHTML +=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span class="quantity-label">
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <select class="quantity-input js-quantity-input-${matchingProduct.id} value="${cartItem.quantity}"">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct)}
        </div>
      </div>
    </div>
  `;
});

// Function to generate the "delivery-options" section of the cart summary
function deliveryOptionsHTML(matchingProduct) {
  //save the delivery options to a variable
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    
    //get and save todays date
    const today = dayjs();
    //add the delivery days to the current date
    //delivery days is saved in the delivery option array imported from deliveryOptions.js
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    //format the date to be displayed in the cart
    const dateString = deliveryDate.format('dddd, MMMM D');
    //generate price for the delivery option
    //price is also saved in the delivery option array imported from deliveryOptions.js
    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;


    html += `
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  });

  return html;
}


// Add the generated HTML to the order summary element in the DOM
document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;


// Add event listeners to the delete links. When clicked, remove the product from the cart and update the cart quantity.
document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();

      updateCartQuantity();
    });
  });

// Function to update the cart quantity in the DOM
  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
  }


// Update the cart quantity in the DOM
updateCartQuantity();


// Add event listeners to the update links. When clicked, show the quantity input and save link.  
document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      console.log(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
    });
  });


// Add event listeners to the save links. When clicked, update the quantity in the cart and update the cart quantity in the DOM.
document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      let newQuantity = Number(quantityInput.value);

      updateQuantity(productId, newQuantity);

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();
    });
  });