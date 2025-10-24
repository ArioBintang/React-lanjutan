import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthor } from "../../../_services/authors";

export default function AuthorIndex() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await getAuthor();
        setAuthors(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuthors();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            👨‍💼 Authors List
          </h2>
          <Link
            to="/admin/authors/create"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow"
          >
            + Add Author
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Bio</th>
                <th className="px-6 py-3">Created At</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 ? (
                authors.map((author, index) => (
                  <tr
                    key={author.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                      {author.name}
                    </td>
                    <td className="px-6 py-3">{author.bio || "-"}</td>
                    <td className="px-6 py-3">
                      {author.created_at
                        ? new Date(author.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-3">
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 font-medium">
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
                    className="text-center py-8 text-gray-500 dark:text-gray-400"
                  >
                    No authors found.
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
