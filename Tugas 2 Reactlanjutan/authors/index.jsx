import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthor, DeleteAuthor } from "../../../_services/authors";

export default function AuthorIndex() {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  const fetchAuthors = async () => {
    try {
      const data = await getAuthor();
      setAuthors(data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data author");
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus author ini?")) return;
    try {
      await DeleteAuthor(id);
      alert("Author berhasil dihapus!");
      fetchAuthors();
    } catch (error) {
      console.error("Gagal menghapus author:", error);
      alert("Gagal menghapus author!");
    }
  };

  return (
    <section className="min-h-screen bg-[#fdf8f3] p-3 sm:p-5">
      <div className="bg-[#fff7ed] border border-[#f0e0d0] rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center p-6 border-b border-[#ecd9c6] bg-[#fff7ed]">
          <h2 className="text-2xl font-semibold text-[#3e2f1c]">
            👨‍💼 Authors List
          </h2>
          <Link
            to="/admin/authors/create"
            className="flex items-center gap-2 bg-[#6b4f3b] hover:bg-[#543729] text-white px-4 py-2 rounded-xl font-medium shadow-sm transition-all duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Author
          </Link>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-[#3e2f1c]">
            <thead className="bg-[#f5e6d3] text-[#3e2f1c] uppercase text-xs">
              <tr>
                <th className="px-6 py-3 font-semibold">#</th>
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-6 py-3 font-semibold">Bio</th>
                <th className="px-6 py-3 font-semibold">Created At</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {authors.length > 0 ? (
                authors.map((author, index) => (
                  <tr
                    key={author.id}
                    className="border-b border-[#f0e0d0] hover:bg-[#f9f1e7] transition"
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3 font-medium">{author.name}</td>
                    <td className="px-6 py-3">{author.bio || "-"}</td>
                    <td className="px-6 py-3">
                      {author.created_at
                        ? new Date(author.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-3">
                        {/* Tombol Edit */}
                        <Link
                          to={`/admin/authors/edit/${author.id}`}
                          className="text-[#6b4f3b] hover:text-[#3e2f1c] font-medium transition"
                        >
                           Edit
                        </Link>

                        {/* Tombol Delete */}
                        <button
                          onClick={() => handleDelete(author.id)}
                          className="text-[#b33c2e] hover:text-[#8b2d22] font-medium transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-[#a67b5b]"
                  >
                    📜 No authors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
