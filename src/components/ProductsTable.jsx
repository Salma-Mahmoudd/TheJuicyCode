import React, { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { TbHttpDelete } from "react-icons/tb";
import ProductEditForm from "./ProductEditForm.jsx";

export default function ProductsTable({
  products,
  updateProduct,
  deleteProduct,
}) {
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const handleEditedProduct = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setEditedProduct({});
  };

  return (
    <div className="my-2 overflow-x-auto text-gray-700">
      {products.length > 0 && (
        <div className="grid grid-cols-15 gap-x-2 px-6 py-4 text-md font-semibold">
          <div className="col-span-3">Product Name</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Unit</div>
          <div className="col-span-5">Description</div>
          <div className="col-span-2">Image</div>
          <div className="col-span-1 flex justify-center">Actions</div>
        </div>
      )}
      {products.map((product) => (
        <div
          key={product.id}
          className="grid grid-cols-15 gap-x-2 px-6 py-4 text-[15px] border-t border-gray-200 hover:bg-gray-100 transition wrap-anywhere"
        >
          {editingProductId === product.id ? (
            <ProductEditForm
              handleEditedProduct={handleEditedProduct}
              editedProduct={editedProduct}
              cancelEdit={cancelEdit}
              updateProduct={updateProduct}
            />
          ) : (
            <>
              <div className="col-span-3 font-bold">{product.name}</div>
              <div className="col-span-2">{product.price}</div>
              <div className="col-span-2">{product.unit}</div>
              <div className="col-span-5">{product.description}</div>
              <div className="col-span-2">{product.image.split("/").pop()}</div>
              <div className="col-span-1 flex flex-col items-center justify-between space-y-5 text-3xl text-gray-400">
                <RiEdit2Fill
                  className="cursor-pointer hover:text-lime-500 transition"
                  onClick={() => {
                    setEditingProductId(product.id);
                    setEditedProduct(product);
                  }}
                />
                <TbHttpDelete
                  className="cursor-pointer hover:text-red-500 transition"
                  onClick={() => deleteProduct(product.id)}
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
