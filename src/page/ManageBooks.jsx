import React, { useEffect, useState } from "react";
import {
  Edit3,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const booksPerPage = 5;
const navigate = useNavigate();
  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      setBooks(response.data);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  // =========================
  // USE EFFECT
  // =========================
  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // SEARCH LOGIC
  // =========================
  const filteredBooks = books.filter((book) => {
    return (
      book.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      book.author
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  // =========================
  // PAGINATION
  // =========================
  const indexOfLastBook = currentPage * booksPerPage;

  const indexOfFirstBook =
    indexOfLastBook - booksPerPage;

  const currentBooks = filteredBooks.slice(
    indexOfFirstBook,
    indexOfLastBook
  );

  const totalPages = Math.ceil(
    filteredBooks.length / booksPerPage
  );

  return (
    <div className="space-y-6 ml-2">

      {/* SEARCH + ACTION */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search book or author..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <Link to={"/add-books"}>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <Plus size={20} />
            Add Product
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-gray-50 border-b border-gray-100">

              <tr className="text-gray-500 text-[13px] uppercase font-bold tracking-wider">

                <th className="px-6 py-4">
                  Product Info
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Pricing
                </th>

                <th className="px-6 py-4">
                  Stock Status
                </th>

                <th className="px-6 py-4 text-right">
                  Operations
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-50">

              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10"
                  >
                    Loading...
                  </td>
                </tr>
              ) : currentBooks.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10"
                  >
                    No Products Found
                  </td>
                </tr>
              ) : (
                currentBooks.map((book) => (

                  <tr
                    key={book._id}
                    className="hover:bg-blue-50/20 transition-colors group"
                  >

                    {/* PRODUCT INFO */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-4">

                        <img
                          src={
                            book.images?.[0] ||
                            "https://placehold.co/400x600"
                          }
                          alt={book.title}
                          className="w-12 h-16 rounded-lg object-cover shadow-sm"
                        />

                        <div>
                          <p className="font-bold text-gray-800 leading-tight">
                            {book.title}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {book.author}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* CATEGORY */}
                    <td className="px-6 py-4">

                      <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">
                        {book.category}
                      </span>

                    </td>

                    {/* PRICE */}
                    <td className="px-6 py-4">

                      <p className="font-black text-gray-900">
                        ৳{book.price}
                      </p>

                      {book.discount > 0 && (
                        <p className="text-[10px] text-green-600 font-bold">
                          -{book.discount}% OFF
                        </p>
                      )}

                    </td>

                    {/* STOCK */}
                    <td className="px-6 py-4">

                      <div
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-bold ${
                          book.stock > 0
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >

                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            book.stock > 0
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></span>

                        {book.stock > 0
                          ? "IN STOCK"
                          : "OUT OF STOCK"}

                      </div>

                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">

                      <div className="flex items-center justify-end gap-2">

                        {/* EDIT */}
                      <button
  onClick={() => navigate(`/edit-book/${book._id}`)}
  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
>
  <Edit3 size={18} />
</button>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            handleDelete(book._id)
                          }
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>

                        {/* MORE */}
                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-all">
                          <MoreVertical size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}
        <div className="p-6 flex items-center justify-between border-t border-gray-50 bg-gray-50/50">

          <p className="text-sm text-gray-500">
            Page{" "}
            <span className="font-bold text-gray-800">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-bold text-gray-800">
              {totalPages || 1}
            </span>
          </p>

          <div className="flex gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="p-2 border rounded-lg bg-white disabled:opacity-50 hover:bg-gray-50 transition-all shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="p-2 border rounded-lg bg-white disabled:opacity-50 hover:bg-gray-50 transition-all shadow-sm"
            >
              <ChevronRight size={18} />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ManageBooks;