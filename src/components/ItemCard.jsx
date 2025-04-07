import { IoTrashBinSharp } from "react-icons/io5";
import QuantityBtn from "./QuantityBtn";

export default function ItemCard({ item, handleProdQuantity }) {
  return (
    <div className="grid grid-cols-14 gap-4 p-4 border-b border-gray-300 mx-4 items-center">
      <div className="col-span-6 flex items-center space-x-4">
        <img src={item.image} alt={item.name} className="object-contain w-20 h-25" />
        <h3 className="font-medium text-gray-700">{item.name}</h3>
      </div>

      <div className="col-span-2 flex justify-center">
        <QuantityBtn item={item} handleProdQuantity={handleProdQuantity} />
      </div>

      <div className="col-span-2 text-right text-gray-700">
        ${item.price.toFixed(2)}
      </div>

      <div className="col-span-2 text-right font-medium">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      <div className="col-span-2 pr-4">
        <IoTrashBinSharp
          onClick={() => handleProdQuantity(0, item.id)}
          className="float-end cursor-pointer text-lg  hover:text-red-700 hover:scale-120 transition-all"
        />
      </div>
    </div>
  );
}
