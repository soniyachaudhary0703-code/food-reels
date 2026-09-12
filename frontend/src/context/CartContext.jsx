import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() =>
    JSON.parse(
      localStorage.getItem("foodreel_cart") || "[]"
    )
  );

  useEffect(() => {
    localStorage.setItem(
      "foodreel_cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (item) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (product) => product._id === item._id
      );

      if (existingItem) {
        return currentCart.map((product) =>
          product._id === item._id
            ? { ...product, qty: product.qty + 1 }
            : product
        );
      }

      return [
        ...currentCart,
        {
          ...item,
          qty: 1,
        },
      ];
    });
  };

  const changeQty = (id, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item._id === id
            ? {
                ...item,
                qty: item.qty + delta,
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        changeQty,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);