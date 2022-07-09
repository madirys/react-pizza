const resetLocalStorage = () => {
  const initialCart = {totalPrice: 0, items: []};
  localStorage.setItem("cart", JSON.stringify(initialCart))
  return initialCart;
};

export const getCartLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : resetLocalStorage();
};