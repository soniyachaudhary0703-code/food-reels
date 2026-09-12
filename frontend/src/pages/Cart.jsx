import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

export default function Cart() {
  const { cart, changeQty, total } = useCart();

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="text-4xl font-black">
        Your Cart
      </h1>

      <div className="mt-6 space-y-3">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between rounded-2xl border bg-white p-4"
          >
            <div>
              <b>{item.title}</b>

              <p>
                ₹{item.price} × {item.qty}
              </p>
            </div>

            <div>
              <button
                onClick={() => changeQty(item._id, -1)}
                className="cursor-pointer rounded-lg border px-3"
              >
                −
              </button>

              <button
                onClick={() => changeQty(item._id, 1)}
                className="ml-2 cursor-pointer rounded-lg border px-3"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between text-xl font-bold">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button
        onClick={() => {
          if (cart.length) {
            toast.success("Order placed successfully");
          }
        }}
        className="mt-5 w-full cursor-pointer rounded-xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600"
      >
        Place Order
      </button>
    </main>
  );
}