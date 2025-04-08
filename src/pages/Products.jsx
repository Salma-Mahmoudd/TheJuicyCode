import SideBar from "../components/SideBar";
import ProdCard from "../components/ProdCard";
import Navbar from "../components/Navbar.jsx";

export default function Products({
  categories,
  products,
  loading,
  cart,
  selectedCategory,
  handleSelectCategory,
  handleProdQuantity,
  handlePage,
  currentPage,
  totalPages,
  handleSearch,
}) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-yellow-400"></div>
      </div>
    );
  }
  return (
    <>
      <Navbar handleSearch={handleSearch} cart={cart} />

      <div className=" mx-auto h-screen grid grid-cols-[200px_1fr] md:grid-cols-[250px_1fr] gap-[20px] pt-[65px] px-5">
        <SideBar
          categories={categories}
          selectedCategory={selectedCategory}
          handleSelectCategory={handleSelectCategory}
        />
        <div className="rounded-xl h-[97%] overflow-y-auto flex flex-col">
          {products.length === 0 && (
            <h1 className="text-center py-10 text-2xl font-bold text-gray-500">No products found</h1>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10 p-4 mx-auto">
            {products.map((prod) =>
              <ProdCard
                key={prod.id}
                prod={prod}
                cartItem={cart.find((item) => item.id === prod.id)}
                handleProdQuantity={handleProdQuantity}
              />
            )}
          </div>
          {totalPages > 1 && (
            <div className="join flex justify-center items-center mt-auto mb-4">
              <button className="join-item btn" onClick={() => handlePage('prev')} disabled={currentPage === 1}>«</button>
              <button className="join-item btn">{currentPage}</button>
              <button className="join-item btn" onClick={() => handlePage('next')} disabled={currentPage === totalPages}>»</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
