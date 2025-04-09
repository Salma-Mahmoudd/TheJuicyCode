import { useState } from "react";
import { RiApps2AddFill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { TbHttpDelete } from "react-icons/tb";

const Dashboard = ({ products, categories, addNewCategory, deleteProduct }) => {
  const [openCategories, setOpenCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const toggleCategory = (categoryId) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories(openCategories.filter((id) => id !== categoryId));
    } else {
      setOpenCategories([...openCategories, categoryId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 text-gray-800 px-10 py-10">
      <div className="max-w-[1350px] mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-slate-800">Product Dashboard</h1>
        <div className="space-y-5">
          <div className="flex items-center sticky top-0 rounded-2xl shadow-lg border border-gray-300 bg-white overflow-hidden p-2">
            <input
              id="newCategory"
              type="text"
              placeholder="Add new category"
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 text-gray-500 text-xl"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <RiApps2AddFill
              className="mx-1 cursor-pointer text-4xl hover:text-gray-700 transition"
              onClick={() => {
                if (newCategory.trim()) {
                  addNewCategory({ name: newCategory });
                  setNewCategory("");
                }
              }
              } />
          </div>

          {categories.map((category) => (
            <div key={category.id} className="rounded-2xl shadow-lg border border-gray-300 bg-white overflow-hidden">
              <div
                className="flex justify-between items-center text-gray-800 text-xl font-semibold px-6 py-4 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                onClick={() => toggleCategory(category.id)}
              >
                <h2>{category.name}</h2>
                <span>{openCategories.includes(category.id) ? "−" : "+"}</span>
              </div>
              
              {openCategories.includes(category.id) && (
                <div className="my-2 overflow-x-auto text-gray-700">
                  <div className="grid grid-cols-15 gap-x-2 px-6 py-4 text-md font-semibold wrap-anywhere">
                    <div className="col-span-3">Product Name</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-2">Unit</div>
                    <div className="col-span-5">Description</div>
                    <div className="col-span-2">Image</div>
                    <div className="col-span-1 flex justify-center">Actions</div>
                  </div>
                  {products
                    .filter((product) => product.categoryId === category.id)
                    .map((product) => (
                      <div key={product.id} className="grid grid-cols-15 gap-x-2 px-6 py-4 text-[15px] border-t border-gray-200 hover:bg-gray-100 transition wrap-anywhere">
                        <div className="col-span-3 font-bold">{product.name}</div>
                        <div className="col-span-2">{product.price}</div>
                        <div className="col-span-2">{product.unit}</div>
                        <div className="col-span-5">{product.description}</div>
                        <div className="col-span-2">{product.image.split("/").pop()}</div>
                        <div className="col-span-1 flex flex-col items-center justify-between space-y-5 text-3xl text-gray-400">
                          <RiEdit2Fill className="cursor-pointer hover:text-lime-500 transition" />
                          <TbHttpDelete className="cursor-pointer hover:text-red-500 transition" onClick={() => deleteProduct(product.id)} />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
