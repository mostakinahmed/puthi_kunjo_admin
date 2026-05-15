import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialForm = {
    title: "",
    author: "",
    description: "",
    price: "",
    discount: 0,
    stock: 0,
    category: "",
    tags: [""],
    images: [""],
    isNewArrival: false,
    isDiscounted: false,
    isTopSelling: false,
    isFeatured: false,
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
  const [loading, setLoading] = useState(true);

  // =========================
  // GET SINGLE PRODUCT
  // =========================
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setForm({
          ...initialForm,
          ...res.data,
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // =========================
  // BASIC INPUT
  // =========================
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

  // =========================
  // SPECIFICATION
  // =========================
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

  // =========================
  // TAGS
  // =========================
  const handleTagChange = (i, value) => {
    const updated = [...form.tags];
    updated[i] = value;

    setForm((prev) => ({ ...prev, tags: updated }));
  };

  const addTag = () =>
    setForm((prev) => ({ ...prev, tags: [...prev.tags, ""] }));

  const removeTag = (i) =>
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, x) => x !== i),
    }));

  // =========================
  // IMAGES
  // =========================
  const handleImageChange = (i, value) => {
    const updated = [...form.images];
    updated[i] = value;

    setForm((prev) => ({ ...prev, images: updated }));
  };

  const addImage = () =>
    setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));

  const removeImage = (i) =>
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, x) => x !== i),
    }));

  // =========================
  // UPDATE API
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cleanedForm = {
        ...form,
        tags: form.tags.filter((t) => t.trim() !== ""),
        images: form.images.filter((i) => i.trim() !== ""),
      };

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        cleanedForm
      );

      alert("Book updated successfully!");
      navigate("/manage-books");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white">

        {/* HEADER */}
        <div className="bg-slate-900 text-white px-8 py-3">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <BookOpen className="text-blue-400" />
            Edit Book
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">

          {/* BASIC INFO */}
          <section>
            <h2 className="text-xl font-bold mb-4">
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="border p-2 w-full"
              />

              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                className="border p-2 w-full"
              />

              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="border p-2 w-full"
              />

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border p-2 w-full"
              />

            </div>
          </section>

          {/* TAGS */}
          <section>
            <h2 className="text-xl font-bold mb-4">Tags</h2>

            {form.tags.map((tag, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={tag}
                  onChange={(e) =>
                    handleTagChange(i, e.target.value)
                  }
                  className="border p-2 w-full"
                />
                <button
                  type="button"
                  onClick={() => removeTag(i)}
                  className="bg-red-500 text-white px-2"
                >
                  X
                </button>
              </div>
            ))}

            <button type="button" onClick={addTag}>
              + Add Tag
            </button>
          </section>

          {/* IMAGES */}
          <section>
            <h2 className="text-xl font-bold mb-4">Images</h2>

            {form.images.map((img, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={img}
                  onChange={(e) =>
                    handleImageChange(i, e.target.value)
                  }
                  className="border p-2 w-full"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="bg-red-500 text-white px-2"
                >
                  X
                </button>
              </div>
            ))}

            <button type="button" onClick={addImage}>
              + Add Image
            </button>
          </section>

          {/* STATUS */}
          <section className="flex gap-4 flex-wrap">

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

          </section>

          {/* ACTION */}
          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={() => navigate("/manage-books")}
              className="bg-gray-300 px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2"
            >
              Update Book
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditBook;