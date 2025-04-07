import ItemCard from "../components/ItemCard"

function Cart({ cart, handleProdQuantity }) {
  const calculateTotal = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)

  const handleReset = () => cart.forEach(item => { handleProdQuantity(1, item.id) })

  const handleClear = () => cart.forEach(item => { handleProdQuantity(0, item.id) })

  return (
    <div className=" min-h-screen p-6 pt-[65px]">
      <div className="max-w-7xl mx-auto">

        {cart.length > 0 ? (
          <>
            <h1 className="text-3xl font-medium text-slate-800 my-6 ">Shopping Cart</h1>
            <div className="rounded-4xl border border-gray-300">

              <div className="grid grid-cols-14 gap-4 p-4 border-b border-gray-300 text-gray-600 mx-4">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              {cart.map((item, index) => (
                <ItemCard
                  handleProdQuantity={handleProdQuantity}
                  key={index}
                  item={item}
                />
              ))}

              <div className="rounded-b-4xl px-11 py-6 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="space-x-4">
                    <button onClick={handleReset} className="cursor-pointer px-4 py-2 bg-gray-200 rounded-3xl hover:bg-gray-300 transition-colors">
                      Reset Quantities
                    </button>
                    <button onClick={handleClear} className="cursor-pointer px-4 py-2 bg-gray-200 rounded-3xl hover:text-red-700 hover:bg-red-200 transition-colors">
                      Clear Cart
                    </button>
                  </div>
                  <div className="text-lg font-semibold">
                    Grand Total: <span className="text-green-600 pl-4">${calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="py-20 text-3xl text-center text-gray-500 animate-pulse">Your cart is empty</div>
        )}

      </div>
    </div>
  );
}

export default Cart;
