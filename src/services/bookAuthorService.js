import axios from "axios";

export const getBookAuthor = async () => {
  try {
    const response = await axios.get("https://localhost:44392/api/BookAuthor");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch BookAuthor");
  }
};

