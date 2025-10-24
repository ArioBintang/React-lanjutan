import API from "../_api";

// Ambil semua data genre
export const getGenres = async () => {
  try {
    const { data } = await API.get("/genres");
    return data.data;
  } catch (error) { 
    console.error("Error fetching genres:", error);
    throw error;
  }
};

// Tambah data genre baru
export const CreateGenre = async (formData) => {
  try {
    const response = await API.post("/genres", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating genre:", error);
    throw error;
  }
};
