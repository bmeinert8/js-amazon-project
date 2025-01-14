import {addToCart, cart, loadFromStorage} from '../../data/cart.js';


/* comment out the following lines to test the addToCart function
  36  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  37  let quantity = Number(quantitySelector.value);
  set the quantity to 1 for testing purposes
  39 matvchingItem.quantity += 1;
*/

describe('test suite: addToCart', () => {
  //Test case 1 add item to existing item in cart if one exists
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });

  //Test case 2 add item to cart if it does not exist
  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    //check that the setItem function was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    //check id that was added to the cart array matches the id that was added
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});