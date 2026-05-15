import React, { useState } from "react";
import { 
  Edit3, 
  Trash2, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical,
  Filter,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

const ManageBooks = () => {
    
  // --- DUMMY DATA ---
  const initialBooks = [
    { _id: "1", title: "সহীহ্ হজ্জ ও উমরাহ্ পালন", author: "আল্লামা আলবানী", price: 49, category: "ইসলামিক", stock: true, image: "https://placehold.co/400x600/2563eb/white?text=Hajj", discount: 25 },
    { _id: "2", title: "প্যারাডক্সিক্যাল সাজিদ", author: "আরিফ আজাদ", price: 250, category: "সমকালীন", stock: true, image: "https://placehold.co/400x600/059669/white?text=Sajid", discount: 10 },
    { _id: "3", title: "The Alchemist", author: "Paulo Coelho", price: 350, category: "Literature", stock: false, image: "https://placehold.co/400x600/7c3aed/white?text=Alchemist", discount: 0 },
    { _id: "4", title: "বেলা ফুরাবার আগে", author: "আরিফ আজাদ", price: 280, category: "ইসলামিক", stock: true, image: "https://placehold.co/400x600/db2777/white?text=Bela", discount: 15 },
    { _id: "5", title: "Atomic Habits", author: "James Clear", price: 450, category: "Self-Help", stock: true, image: "https://placehold.co/400x600/ea580c/white?text=Habits", discount: 5 },
    { _id: "6", title: "Python Programming", author: "John Smith", price: 600, category: "Technology", stock: true, image: "https://placehold.co/400x600/0284c7/white?text=Python", discount: 20 },
    { _id: "7", title: "হুমায়ূন আহমেদের শ্রেষ্ঠ গল্প", author: "হুমায়ূন আহমেদ", price: 400, category: "গল্প", stock: true, image: "https://placehold.co/400x600/4b5563/white?text=Humayun", discount: 12 },
  ];

  const [books] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  // Search Logic
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="space-y-6 ml-2">
      {/* Search and Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search book or author..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
          />
        </div>
        
        <Link to={"/add-books"}>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          <Plus size={20} /> Add Product
        </button>
        </Link>
      
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-gray-200  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-gray-500 text-[13px] uppercase font-bold tracking-wider">
                <th className="px-6 py-4">Product Info</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Pricing</th>
                <th className="px-6 py-4">Stock Status</th>
                <th className="px-6 py-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentBooks.map((book) => (
                <tr key={book._id} className="hover:bg-blue-50/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={book.image} className="w-12 h-16 rounded-lg object-cover shadow-sm group-hover:scale-105 transition-transform" />
                      <div>
                        <p className="font-bold text-gray-800 leading-tight">{book.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-600 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-black text-gray-900">৳{book.price}</p>
                    {book.discount > 0 && <p className="text-[10px] text-green-600 font-bold">-{book.discount}% OFF</p>}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-bold ${book.stock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${book.stock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {book.stock ? "IN STOCK" : "OUT OF STOCK"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={18} /></button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                      <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-all"><MoreVertical size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination */}
        <div className="p-6 flex items-center justify-between border-t border-gray-50 bg-gray-50/50">
          <p className="text-sm text-gray-500">
            Page <span className="font-bold text-gray-800">{currentPage}</span> of <span className="font-bold text-gray-800">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 border rounded-lg bg-white disabled:opacity-50 hover:bg-gray-50 transition-all shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
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