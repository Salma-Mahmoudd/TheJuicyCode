import { GiCancel } from "react-icons/gi";
import { MdDataSaverOn } from "react-icons/md";

export default function ProductEditForm({
  editedProduct,
  handleEditedProduct,
  cancelEdit,
  updateProduct,
}) {
  return (
    <>
      <input
        type="text"
        name="name"
        value={editedProduct.name}
        onChange={(e) => handleEditedProduct(e)}
        placeholder="Product Name"
        className="col-span-3 border rounded px-2"
      />
      <input
        type="number"
        step={0.01}
        name="price"
        value={editedProduct.price}
        onChange={(e) => handleEditedProduct(e)}
        placeholder="Price"
        className="col-span-2 border rounded px-2"
      />
      <input
        type="text"
        name="unit"
        value={editedProduct.unit}
        onChange={(e) => handleEditedProduct(e)}
        placeholder="Unit"
        className="col-span-2 border rounded px-2"
      />
      <input
        type="text"
        name="description"
        value={editedProduct.description}
        onChange={(e) => handleEditedProduct(e)}
        className="col-span-5 border rounded px-2"
        placeholder="Description"
      />
      <input
        type="text"
        name="image"
        value={editedProduct.image}
        onChange={(e) => handleEditedProduct(e)}
        className="col-span-2 border rounded px-2"
        placeholder="Image URL"
      />
      <div className="col-span-1 flex flex-col items-center justify-between space-y-5 text-gray-400">
        <MdDataSaverOn
          className="cursor-pointer hover:text-lime-500 transition text-[28px]"
          onClick={() => {
            updateProduct(editedProduct.id, editedProduct);
            cancelEdit();
          }}
        />
        <GiCancel
          className="cursor-pointer hover:text-red-500 transition text-[25px]"
          onClick={() => cancelEdit()}
        />
      </div>
    </>
  );
}
