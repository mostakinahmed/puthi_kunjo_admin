import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBook = () => {
  const navigate = useNavigate();

  const initialForm = {
    title: "",
    author: "",
    description: "",
    price: "",
    discount: 0,
    stock: 0,

    // CATEGORY
    category: "",

    // ARRAYS
    tags: [""],
    images: [""],

    // STATUS
    isNewArrival: false,
    isDiscounted: false,
    isTopSelling: false,
    isFeatured: false,

    // SPECIFICATION
    specification: {
      publisher: "",
      isbn: "",
      edition: "",
      pages: "",
      country: "",
      language: "",
    },
  };

  const [form, setForm] = useState(initialForm);

  // BASIC INPUT
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  // SPECIFICATION INPUT
  const handleSpecChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      specification: {
        ...prev.specification,
        [name]: value,
      },
    }));
  };

  // TAGS
  const handleTagChange = (index, value) => {
    const updated = [...form.tags];
    updated[index] = value;

    setForm((prev) => ({
      ...prev,
      tags: updated,
    }));
  };

  const addTag = () => {
    setForm((prev) => ({
      ...prev,
      tags: [...prev.tags, ""],
    }));
  };

  const removeTag = (index) => {
    const updated = form.tags.filter((_, i) => i !== index);

    setForm((prev) => ({
      ...prev,
      tags: updated.length ? updated : [""],
    }));
  };

  // IMAGES
  const handleImageChange = (index, value) => {
    const updated = [...form.images];
    updated[index] = value;

    setForm((prev) => ({
      ...prev,
      images: updated,
    }));
  };

  const addImage = () => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const removeImage = (index) => {
    const updated = form.images.filter((_, i) => i !== index);

    setForm((prev) => ({
      ...prev,
      images: updated.length ? updated : [""],
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cleanedForm = {
        ...form,
        tags: form.tags.filter((tag) => tag.trim() !== ""),
        images: form.images.filter((img) => img.trim() !== ""),
      };

      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        cleanedForm
      );

      console.log(response.data);

      alert("Book added successfully!");

      setForm(initialForm);

      navigate("/manage-books");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Failed to add book"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white  overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-slate-900 text-white px-8 py-3">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <BookOpen className="text-blue-400" />
            Add New Book
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">

          {/* BASIC INFO */}
          <section>
            <h2 className="text-xl font-bold mb-4">
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              {/* TITLE */}
              <div>
                <label className="block mb-1">Book Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              {/* AUTHOR */}
              <div>
                <label className="block mb-1">Author</label>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block mb-1">Category</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                  <option value="education">Education</option>
                </select>
              </div>

              {/* PRICE */}
              <div>
                <label className="block mb-1">Price</label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              {/* DISCOUNT */}
              <div>
                <label className="block mb-1">
                  Discount (%)
                </label>

                <input
                  type="number"
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              {/* STOCK */}
              <div>
                <label className="block mb-1">Stock</label>

                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="block mb-1">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

            </div>
          </section>

          {/* TAGS */}
          <section>
            <h2 className="text-xl font-bold mb-4">Tags</h2>

            {form.tags.map((tag, index) => (
              <div key={index} className="flex gap-3 mb-2">

                <input
                  type="text"
                  value={tag}
                  onChange={(e) =>
                    handleTagChange(index, e.target.value)
                  }
                  className="flex-1 border rounded-lg px-3 py-2"
                />

                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="bg-red-500 text-white px-3 rounded-lg"
                >
                  X
                </button>

              </div>
            ))}

            <button
              type="button"
              onClick={addTag}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Add Tag
            </button>
          </section>

          {/* SPECIFICATION */}
          <section>
            <h2 className="text-xl font-bold mb-4">
              Specification
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              {Object.keys(form.specification).map((key) => (
                <div key={key}>

                  <label className="block mb-1 capitalize">
                    {key}
                  </label>

                  <input
                    type="text"
                    name={key}
                    value={form.specification[key]}
                    onChange={handleSpecChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />

                </div>
              ))}

            </div>
          </section>

          {/* IMAGES */}
          <section>
            <h2 className="text-xl font-bold mb-4">
              Images
            </h2>

            {form.images.map((img, index) => (
              <div key={index} className="flex gap-3 mb-2">

                <input
                  type="text"
                  placeholder="Image URL"
                  value={img}
                  onChange={(e) =>
                    handleImageChange(index, e.target.value)
                  }
                  className="flex-1 border rounded-lg px-3 py-2"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="bg-red-500 text-white px-3 rounded-lg"
                >
                  X
                </button>

              </div>
            ))}

            <button
              type="button"
              onClick={addImage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              + Add Image
            </button>
          </section>

          {/* STATUS */}
          <section>
            <h2 className="text-xl font-bold mb-4">
              Status
            </h2>

            <div className="flex flex-wrap gap-6">

              <label>
                <input
                  type="checkbox"
                  name="isNewArrival"
                  checked={form.isNewArrival}
                  onChange={handleChange}
                />{" "}
                New Arrival
              </label>

              <label>
                <input
                  type="checkbox"
                  name="isDiscounted"
                  checked={form.isDiscounted}
                  onChange={handleChange}
                />{" "}
                Discounted
              </label>

              <label>
                <input
                  type="checkbox"
                  name="isTopSelling"
                  checked={form.isTopSelling}
                  onChange={handleChange}
                />{" "}
                Top Selling
              </label>

              <label>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                />{" "}
                Featured
              </label>

            </div>
          </section>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-4 border-t">

            <button
              type="button"
              onClick={() => navigate("/manage-books")}
              className="px-6 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              Save Book
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddBook;