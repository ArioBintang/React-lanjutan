import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGenres } from "../../../_services/genres";
import { getAuthor } from "../../../_services/authors";
import { CreateBook } from "../../../_services/books";

export default function BookCreate() {
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    genre_id: "",
    author_id: "",
    cover_photo: null,
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresData, authorsData] = await Promise.all([
          getGenres(),
          getAuthor(),
        ]);
        setGenres(genresData);
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cover_photo") {
      setFormData({
        ...formData,
        cover_photo: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      for (const key in formData) {
        payload.append(key, formData[key]);
      }

      await CreateBook(payload);
      alert("Book created successfully!");
      navigate("/admin/books");
    } catch (error) {
      console.error("Error creating book:", error);
      alert("Error creating book. Check console/logs.");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Insert New Book
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">

            {/* TITLE */}
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                placeholder="Book Title"
                required
              />
            </div>

            {/* PRICE */}
            <div className="w-full">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 120000"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                required
              />
            </div>

            {/* STOCK */}
            <div className="w-full">
              <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="e.g. 10"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                required
              />
            </div>

            {/* GENRE */}
            <div className="w-full">
              <label htmlFor="genre_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Genre
              </label>
              <select
                id="genre_id"
                name="genre_id"
                value={formData.genre_id}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                required
              >
                <option value="">-- Select Genre --</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* AUTHOR */}
            <div className="w-full">
              <label htmlFor="author_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Author
              </label>
              <select
                id="author_id"
                name="author_id"
                value={formData.author_id}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                required
              >
                <option value="">-- Select Author --</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* COVER */}
            <div className="w-full">
              <label htmlFor="cover_photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Cover Book
              </label>
              <input
                type="file"
                name="cover_photo"
                id="cover_photo"
                accept="image/*"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full cursor-pointer"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write a description of the book..."
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Insert Book
            </button>

            <button
              type="reset"
              className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <svg
                className="w-5 h-5 mr-1 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                />
              </svg>
              Delete
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
