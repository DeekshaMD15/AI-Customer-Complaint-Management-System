import api from "./api";

export const updateComplaint = async (id, complaint) => {
  const response = await api.put(
    `/api/complaints/${id}`,
    complaint
  );

  return response.data;
};