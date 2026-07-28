import API from "./api";

export const uploadComplaint = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await API.post("/api/upload", formData);

  return response.data;
};