import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShowAuthor, UpdateAuthor } from "../../../_services/authors";

export default function AuthorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  // Ambil data author berdasarkan ID
  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const authorData = await ShowAuthor(id);
        setName(authorData.name || "");
        setBio(authorData.bio || "");
      } catch (error) {
        console.error("Error fetching author:", error);
        alert("Gagal mengambil data author!");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  // Handle submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("_method", "PUT");

      await UpdateAuthor(id, formData);
      alert("Author updated successfully!");
      navigate("/admin/authors");
    } catch (error) {
      console.error("Error updating author:", error);
      alert("Failed to update author.");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 py-10">Loading author data...</p>;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 border-b pb-2">
          ✏️ Edit Author
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Author Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:ring-indigo-600 focus:border-indigo-600 bg-gray-50 p-2.5"
              placeholder="e.g. J.K. Rowling"
              required
            />
          </div>

          {/* BIO */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Author Bio
            </label>
            <textarea
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="4"
              className="w-full rounded-lg border-gray-300 focus:ring-indigo-600 focus:border-indigo-600 bg-gray-50 p-2.5"
              placeholder="Write a short biography..."
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/authors")}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md"
            >
              Update Author
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
