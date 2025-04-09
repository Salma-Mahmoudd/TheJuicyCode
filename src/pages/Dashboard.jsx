import { useState } from "react";
import { RiApps2AddFill } from "react-icons/ri";
import ProductFormModal from "../components/ProductFormModal.jsx";
import ProductsTable from "../components/ProductsTable.jsx";

const Dashboard = ({
  products,
  categories,
  addNewCategory,
  addNewProduct,
  updateProduct,
  deleteProduct,
}) => {
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
        <h1 className="text-4xl font-bold mb-10 text-center text-slate-800">
          Product Dashboard
        </h1>
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
              className="mx-1 cursor-pointer text-4xl hover:text-gray-500 transition"
              onClick={() => {
                if (newCategory.trim()) {
                  addNewCategory({ name: newCategory });
                  setNewCategory("");
                }
              }}
            />
          </div>

          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl shadow-lg border border-gray-300 bg-white overflow-hidden"
            >
              <div
                className="flex justify-between items-center text-gray-800 text-xl font-semibold px-6 py-4 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                onClick={() => toggleCategory(category.id)}
              >
                <h2>{category.name}</h2>
                <span>{openCategories.includes(category.id) ? "−" : "+"}</span>
              </div>

              {openCategories.includes(category.id) && (
                <>
                  <div className="flex items-center justify-end px-6 py-3">
                    <ProductFormModal
                      addNewProduct={addNewProduct}
                      categoryId={category.id}
                    />
                  </div>
                  <ProductsTable
                    products={products.filter(
                      (product) => product.categoryId === category.id
                    )}
                    updateProduct={updateProduct}
                    deleteProduct={deleteProduct}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
