//Import cart array from cart js file
import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
//Import products array from products js file
import {products, loadProducts} from '../data/products.js';
//Import formatCurrency function from money js file
import {formatCurrency} from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {

  //loop thorugh the products array and create html for the data

  //variable to store the html from the loop
  let productsHTML = '';

  //loop through the products array adding each product to the empty productsHTML variable string.
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  // If a search exists in the URL parameters,
  // filter the products that match the search.
  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  filteredProducts.forEach((product) => {
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
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
        <div class="product-price">
          ${product.getPrice()}
        </div>
        <div class="product-quantity-container">
          <select>
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
        ${product.extraInfoHTML()}
        <div class="product-spacer"></div>
        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>
        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
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
    const cartQuantity = calculateCartQuantity();

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
    document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });
}