import axios from "axios";

const API_URL = "http://localhost:44392/api";

export const getAllAuthors = async () => {
  try {
    const response = await axios.get("https://localhost:44392/api/Author");
    return(response.data);
  } catch (error) {
    console.log("Failed to fetch authors");
  }
};
