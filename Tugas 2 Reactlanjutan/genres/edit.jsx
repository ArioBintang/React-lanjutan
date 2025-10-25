import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShowGenre, UpdateGenre } from "../../../_services/genres";

export default function GenreEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  // Ambil data genre berdasarkan ID
  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const genreData = await ShowGenre(id);
        setName(genreData.name || "");
      } catch (error) {
        console.error("Error fetching genre:", error);
        alert("Gagal mengambil data genre!");
      } finally {
        setLoading(false);
      }
    };

    fetchGenre();
  }, [id]);

  // Handle submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("_method", "PUT");

      await UpdateGenre(id, formData);
      alert("Genre updated successfully!");
      navigate("/admin/genres");
    } catch (error) {
      console.error("Error updating genre:", error);
      alert("Failed to update genre.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update Genre
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            {/* NAME */}
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Genre Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Fantasy, Sci-Fi..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => navigate("/admin/genres")}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md"
            >
              Update Genre
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
