export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

//function to get the delivery option by id
export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

    //loop through the delivery options to find the delivery option that matches the delivery option id
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

  return deliveryOption || deliveryOption[0];
}