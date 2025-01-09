export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

//function to save cart to local storage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

//function to add product to the cart array
export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  let quantity = Number(quantitySelector.value);
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else{
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

    saveToStorage();
}


//function to remove product from the cart array
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

//function to update the delivery option
export function updateDeliveryOption(productId, deliveryOptionId) {

  //loop through the cart array to find the product.
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  //update the delivery option id
  matchingItem.deliveryOptionId = deliveryOptionId;

  //save the cart to local storage
  saveToStorage();
}