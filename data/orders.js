export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  //unshift adds the order to the beginning of the array instead of the end
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}