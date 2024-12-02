import axios from "axios";

export const getAllBooks = async () => {
  try {
    const response = await axios.get("https://localhost:44392/api/Book");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch authors");
  }
};

export const createBook = async (data) => {
  try {
    const response = await axios.post("https://localhost:44392/api/Book", data);
    return response.data;
  } catch (error) {
    console.log("Failed to creating Book");
  }
};
export const getBookById = async (id) => {
  try {
    const response = await axios.get(`https://localhost:44392/api/Book/${id}`);
    return response.data;
  } catch (error) {
    console.log("Failed to get Book");
  }
};

export const updateBookById = async (id, data) => {
  try {
    const response = await axios.put(
      `https://localhost:44392/api/Book/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log("Failed to update Book");
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(
      `https://localhost:44392/api/Book/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to delete Book");
  }
};