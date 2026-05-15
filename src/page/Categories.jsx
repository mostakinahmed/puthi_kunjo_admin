import React, { useState } from "react";
import {
  Layers3,
  PlusCircle,
  Pencil,
  Trash2,
  Search,
  X,
} from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Islamic", books: 120 },
    { id: 2, name: "Programming", books: 85 },
    { id: 3, name: "History", books: 45 },
  ]);

  const [categoryName, setCategoryName] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // ADD CATEGORY
  const handleAddCategory = () => {
    if (!categoryName.trim()) return;

    const newCategory = {
      id: Date.now(),
      name: categoryName,
      books: 0,
    };

    setCategories([...categories, newCategory]);
    setCategoryName("");
  };

  // DELETE CATEGORY
  const handleDelete = (id) => {
    const filtered = categories.filter((cat) => cat.id !== id);
    setCategories(filtered);
  };

  // EDIT CATEGORY
  const handleEdit = (category) => {
    setEditId(category.id);
    setCategoryName(category.name);
  };

  // UPDATE CATEGORY
  const handleUpdate = () => {
    const updatedCategories = categories.map((cat) =>
      cat.id === editId
        ? { ...cat, name: categoryName }
        : cat
    );

    setCategories(updatedCategories);
    setEditId(null);
    setCategoryName("");
  };

  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditId(null);
    setCategoryName("");
  };

  // FILTER CATEGORY
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-2">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ADD / EDIT SECTION */}
        <div className="bg-white  border border-gray-100 p-6 h-fit">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
              <Layers3 size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                {editId ? "Edit Category" : "Add Category"}
              </h2>

              <p className="text-sm text-gray-500">
                Manage category information
              </p>
            </div>
          </div>

          {/* INPUT */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-blue-100"
            />

            {/* BUTTON */}
            {editId ? (
              <div className="flex gap-3">
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition-all"
                >
                  Update
                </button>

                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddCategory}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <PlusCircle size={20} />
                Add Category
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY LIST */}
        <div className="lg:col-span-2 bg-white border border-gray-100 p-6">
          
          {/* TOP */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            
            <h2 className="text-2xl font-bold text-gray-800">
              Category List
            </h2>

            {/* SEARCH */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-blue-100"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full">
              
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm">
                  <th className="text-left px-5 py-4">
                    Category Name
                  </th>

                  <th className="text-left px-5 py-4">
                    Books
                  </th>

                  <th className="text-center px-5 py-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                  >
                    {/* NAME */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                          <Layers3 size={18} />
                        </div>

                        <span className="font-semibold text-gray-700">
                          {category.name}
                        </span>
                      </div>
                    </td>

                    {/* BOOKS */}
                    <td className="px-5 py-4 text-gray-600">
                      {category.books} Books
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-3">
                        
                        {/* EDIT */}
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2 rounded-lg bg-amber-100 text-amber-600 hover:bg-amber-200 transition-all"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* EMPTY */}
                {filteredCategories.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-10 text-gray-400"
                    >
                      No Categories Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;