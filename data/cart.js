export const cart = [];

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
      quantity
    });
  }
}