'use client';

import { useCart } from '@/components/CartContext';
import { CartItem } from '@/types/cart';
import Link from 'next/link';

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (total: number, item: CartItem) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item: CartItem, index: number) => (
                <div
                  key={`${item.slug}-${index}`}
                  className="flex items-center justify-between border p-4 rounded shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)} × {item.quantity || 1} ={' '}
                        <strong>${(item.price * (item.quantity || 1)).toFixed(2)}</strong>
                      </p>

                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() => decreaseQuantity(item)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="px-2">{item.quantity || 1}</span>
                        <button
                          onClick={() => increaseQuantity(item)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-right space-y-4">
              <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                className="ml-4 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
