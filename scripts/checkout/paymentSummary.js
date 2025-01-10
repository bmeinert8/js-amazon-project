import {cart, calculateCartQuantity} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';

//function to show payment summary
export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;


  //loop through the cart array
  cart.forEach((cartItem) => {
    //get the product that matches the product id saving it as a variable used for calculations
    const product = getProduct(cartItem.productId);
    //get the product price based on the quantity of the product
    productPriceCents += product.priceCents * cartItem.quantity;

    //get the delivery option that matches the delivery option id
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  //get the total price of the products and shipping
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  //Generate the HTML for the payment summary section
  const paymentSummaryHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${calculateCartQuantity()}):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}

