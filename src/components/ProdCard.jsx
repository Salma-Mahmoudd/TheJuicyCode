import { FaShoppingBasket } from "react-icons/fa";
import QuantityBtn from "./QuantityBtn.jsx";

export default function ProdCard({ prod, cartItem, handleProdQuantity }) {
  return (
    <div className="max-w-[450px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col items-center">
      <div className="h-50 bg-gray-100 overflow-hidden">
        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{prod.name}</h3>
            <p className="text-gray-600 mt-1">{prod.price} $ / {prod.unit}</p>
          </div>
          <button onClick={() => cartItem ? handleProdQuantity(0, prod.id) : handleProdQuantity(1, prod.id)} className={`text-lime-600 cursor-pointer bg-lime-200 rounded-[50%] p-2 transition-colors ${cartItem ? "bg-lime-400 text-white" : "hover:text-lime-800"}`}>
            <FaShoppingBasket className="text-xl " />
          </button>
        </div>

        <p className="text-gray-500 mt-3 text-sm">{prod.description}</p>

        {cartItem && (
          <div className="mt-auto mx-auto pt-4">
            <QuantityBtn item={cartItem} handleProdQuantity={handleProdQuantity} />
          </div>
        )}
      </div>
    </div>
  );
}
