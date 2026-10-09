
import { useEffect, useState } from "react";
import API from "../utils/api";

function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  const [editId, setEditId] = useState(null);

  // ================= GET PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    loadProducts();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= CREATE / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/products/${editId}`, form);
        alert("Product updated");
      } else {
        await API.post("/products", form);
        alert("Product created");
      }

      setForm({
        name: "",
        price: "",
        stock: "",
        description: "",
        image: "",
      });

      setEditId(null);
      await fetchProducts();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to save product");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;

    try {
      await API.delete(`/products/${id}`);
      await fetchProducts();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.detail || "Failed to delete product");
    }
  };

  // ================= EDIT =================
  const handleEdit = (p) => {
    setForm({
      name: p.name ?? "",
      price: p.price ?? "",
      stock: p.stock ?? "",
      description: p.description ?? "",
      image: p.image ?? "",
    });

    setEditId(p._id);
  };

  return (
    <div className="pl-1 pr-1 md:pr-64">
      <h2
        className="
          text-4xl
          font-bold
          mb-8
          bg-linear-to-r
          from-cyan-400
          to-purple-400
          bg-clip-text
          text-transparent
        "
      >
        Manage Products
      </h2>

      <form
        onSubmit={handleSubmit}
        className="
          mb-8
          p-6
          w-full
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          shadow-xl
        "
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-4 p-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full mb-4 p-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full mb-4 p-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full mb-4 p-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-4 p-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-linear-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-purple-500/20 transition-all duration-300"
          >
            <img
              src={p.image}
              alt={p.name || "Product"}
              className="h-52 w-full object-cover transition-transform duration-500 hover:scale-110"
            />

            <div className="p-4">
              <h3 className="text-white font-bold text-lg">
                {p.name}
              </h3>

              <p className="text-cyan-400 font-bold text-xl mt-2">
                ${p.price}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => handleEdit(p)}
                  className="flex-1 py-2 rounded-xl bg-yellow-500 text-white hover:scale-105 transition-all duration-300"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 py-2 rounded-xl bg-red-500 text-white hover:scale-105 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-400 py-8">
          No products found.
        </p>
      )}
    </div>
  );
}

export default ProductsAdmin;