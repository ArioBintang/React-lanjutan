    import API from "../_api";

    export const getAuthor = async () => {
    const { data } = await API.get("/authors");
    return data.data;
    };

    export const CreateAuthor = async (data) => {
    try {
        const response = await API.post("/authors", data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
    };
