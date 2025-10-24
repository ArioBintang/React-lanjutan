import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../../../_services/genres";

export default function AdminGenres() {
  const [genres, setGenres] = useState([]);
 
   useEffect(() => {
     const fetchGenres = async () => {
       try {
         const data = await getGenres();
         setGenres(data);
       } catch (error) {
         console.error(error);
       }
     };
     fetchGenres();
   }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            📚 Genres List
          </h2>
          <Link
            to="/admin/genres/create"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow"
          >
            + Add Genre
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
             {genres.length > 0 ? (
                genres.map((genre, index) => (
                  <tr
                    key={genre.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                      {genre.name}
                    </td>
                    <td className="px-6 py-3">{genre.bio || "-"}</td>
                    <td className="px-6 py-3">
                      {genre.created_at
                        ? new Date(genre.created_at).toLocaleDateString()
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
                    No genres found.
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
 