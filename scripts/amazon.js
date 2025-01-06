//Import cart array from cart js file
import {cart, addToCart} from '../data/cart.js';
//Import products array from products js file
import {products} from '../data/products.js';
//Import formatCurrency function from money js file
import {formatCurrency} from './utils/money.js';

//loop thorugh the products array and create html for the data

//variable to store the html from the loop
let productsHTML = '';

//loop through the products array adding each product to the empty productsHTML variable string.
products.forEach( (product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${formatCurrency(product.priceCents)}
      </div>
      
      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
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
      </div>
        
      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`;
});

//add the generated html to the products-grid element in the DOM
document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;

/*
  Use an object to save the timeout ids.
 The reason we use an object is because each product
 will have its own timeoutId. So an object lets us
 save multiple timeout ids for different products.
 For example:
 {
   'product-id1': 2,
   'product-id2': 5,
   ...
 }
 (2 and 5 are ids that are returned when we call setTimeout).*/
const addedMessageTimeouts = {};

//function to update the cart quantity in the DOM
function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

updateCartQuantity();


//function to display the added to cart message for 2 seconds
function timeoutMessage(productId) {
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add('added-to-cart-visible');
  /* Check if there's a previous timeout for this
  product. If there is, we should stop it.*/
  const previousTimeoutId = addedMessageTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }
  const timeoutId = setTimeout(() => { addedMessage.classList.remove('added-to-cart-visible');
  }, 2000);
  /* Save the timeoutId for this product
    so we can stop it later if we need to.*/
  addedMessageTimeouts[productId] = timeoutId;
}

//add cart button to the DOM and add event listener to all the add to cart buttons
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset;
      addToCart(productId);
      updateCartQuantity();
      timeoutMessage(productId);
    });
  });