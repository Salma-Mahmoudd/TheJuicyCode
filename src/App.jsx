import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [categoryResponse, productsResponse] = await Promise.all([
          axios.get("http://localhost:3002/categories"),
          axios.get("http://localhost:3002/products/"),
        ]);
        setCategories(categoryResponse.data);
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const handleSelectCategory = (categoryId) => {
    setCurrentPage(1);
    setSelectedCategory(categoryId);
    setFilteredProducts(
      categoryId
        ? products.filter((prod) => prod.categoryId === categoryId)
        : products
    );
  }

  const handleSearch = (val) => {
    setCurrentPage(1);
    setFilteredProducts(
      products.filter((prod) =>
        (selectedCategory ? prod.categoryId === selectedCategory : true) &&
        prod.name.toLowerCase().includes(val.toLowerCase())
      )
    );
  };

  const handleProdQuantity = (quantity, prodId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === prodId);

      return existingProduct ?
        prevCart.map((item) => item.id === prodId
          ? { ...item, quantity }
          : item).filter((item) => item.quantity > 0)
        : [...prevCart, { ...products.find((prod) => prod.id === prodId), quantity: 1 }];
    });
  }

  const handlePage = (direction) => {
    setCurrentPage(prevPage => {
      const newPage = direction === 'next' ? prevPage + 1 : prevPage - 1;
      return Math.max(1, Math.min(newPage, Math.ceil(filteredProducts.length / productsPerPage)));
    });
  };

  const addNewCategory = async (newCategory) => {
    try {
      const response = await axios.post("http://localhost:3002/categories", newCategory);
      if (response.status === 201) {
        setCategories((prevCategories) => [...prevCategories, response.data]);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  }

  const addNewProduct = async (newProduct) => {
    try {
      const response = await axios.post("http://localhost:3002/products", newProduct);
      if (response.status === 201) {
        setProducts((prevProducts) => [...prevProducts, response.data]);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:3002/products/${id}`, updatedProduct);
      if (response.status === 200) {
        setProducts((prevProducts) => prevProducts.map((product) => product.id === id ? response.data : product));
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3002/products/${id}`);
      if (response.status === 200) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      }      
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <Dashboard
            categories={categories}
            products={products}
            addNewCategory={addNewCategory}
            addNewProduct={addNewProduct}
            updateProduct={updateProduct}
            deleteProduct={deleteProduct}
          />
        } />
        <Route path="/cart" element={<Cart cart={cart} handleProdQuantity={handleProdQuantity} />} />
        <Route path="/products" element={
          <Products
            loading={loading}
            products={filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)}
            categories={categories}
            cart={cart}
            selectedCategory={selectedCategory}
            handleSelectCategory={handleSelectCategory}
            handleProdQuantity={handleProdQuantity}
            handlePage={handlePage}
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
            handleSearch={handleSearch}
          />
        } />
        <Route path="*" element={<div className="text-center py-20 text-3xl text-gray-500 animate-pulse">Page not found</div>} />
      </Routes>
    </>
  );
}
