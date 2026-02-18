import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const putFormData = async (formData) => {
     const response = await axios.post(`${API_URL}/uploadFiles`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
     });
     return response;
}