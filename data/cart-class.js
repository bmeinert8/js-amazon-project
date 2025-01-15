class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = 'cart-oop'; 
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
  
    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  }

  //function to save cart to local storage
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  //function to add product to the cart array
  addToCart(productId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
      });
  
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    let quantity = Number(quantitySelector.value);
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  //function to calculate the total quantity of products in the cart
  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItem.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  }

   //function to update the delivery option
   updateDeliveryOption(productId, deliveryOptionId) {
  
    //loop through the cart array to find the product.
    let matchingItem;
  
      this.cartItem.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
  
      //update the delivery option id
      matchingItem.deliveryOptionId = deliveryOptionId;
  
      //save the cart to local storage
      this.saveToStorage();
  }
}


const cart = new Cart();

console.log(cart);