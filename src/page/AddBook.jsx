import React, { useState } from "react";
import {
    Upload,
    BookOpen,
    DollarSign,
    Layers,
    FileText,
    Image as ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBookData({
            ...bookData,
            [name]: value,
        });
    };

    const handleImage = (e) => {
        setBookData({
            ...bookData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(bookData);

        alert("Book Added Successfully!");
    };

    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto bg-white  shadow-lg overflow-hidden">

                {/* Header */}
                <div className="bg-slate-900 text-white px-8 py-4">
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        <BookOpen className="text-blue-400" />
                        Add New Book
                    </h1>

                 
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Book Title */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Book Title
                        </label>

                        <div className="relative">
                            <BookOpen
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                name="title"
                                value={bookData.title}
                                onChange={handleChange}
                                placeholder="Enter book title"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-blue-100"
                            />
                        </div>
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Author Name
                        </label>

                        <input
                            type="text"
                            name="author"
                            value={bookData.author}
                            onChange={handleChange}
                            placeholder="Enter author name"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-blue-100"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Category
                        </label>

                        <div className="relative">
                            <Layers
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <select
                                name="category"
                                value={bookData.category}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-blue-100 bg-white"
                            >
                                <option value="">Select Category</option>
                                <option value="Islamic">Islamic</option>
                                <option value="Science">Science</option>
                                <option value="Programming">Programming</option>
                                <option value="History">History</option>
                            </select>
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Price
                        </label>

                        <div className="relative">
                            <DollarSign
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="number"
                                name="price"
                                value={bookData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-blue-100"
                            />
                        </div>
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Stock Quantity
                        </label>

                        <input
                            type="number"
                            name="stock"
                            value={bookData.stock}
                            onChange={handleChange}
                            placeholder="Available stock"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-blue-100"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Book Cover
                        </label>

                        <label className="flex items-center gap-3 border border-dashed border-gray-300 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition-all">
                            <ImageIcon className="text-gray-500" size={20} />

                            <span className="text-gray-500 text-sm">
                                {bookData.image
                                    ? bookData.image.name
                                    : "Upload Book Image"}
                            </span>

                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImage}
                            />
                        </label>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">
                            Description
                        </label>

                        <div className="relative">
                            <FileText
                                size={18}
                                className="absolute left-3 top-4 text-gray-400"
                            />

                            <textarea
                                rows="5"
                                name="description"
                                value={bookData.description}
                                onChange={handleChange}
                                placeholder="Write book description..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-blue-100 resize-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 flex justify-end gap-5">

                        <button
                            type="button"
                            onClick={() => navigate("/manage-books")}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-md transition-all active:scale-95"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
                        >
                            <Upload size={18} />
                            Add Book
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBook;