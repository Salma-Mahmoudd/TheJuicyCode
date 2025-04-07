export default function QuabtityBtn({ item, handleProdQuantity }) {
  return (
    <div className="flex items-center">
      <button onClick={() => handleProdQuantity(item.quantity - 1, item.id)} className="bg-gray-200 px-3 py-1 rounded-l cursor-pointer">-</button>
      <span className="px-4 bg-gray-100 py-1">{item.quantity}</span>
      <button onClick={() => handleProdQuantity(item.quantity + 1, item.id)} className="bg-gray-200 px-3 py-1 rounded-r cursor-pointer" >+</button>
    </div>
  )
}
