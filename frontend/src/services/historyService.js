import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const getComplaints = async () => {
  const response = await axios.get(`${API}/complaints`);
  return response.data;
};

export const deleteComplaint = async (id) => {
  const response = await axios.delete(`${API}/complaints/${id}`);
  return response.data;
};

