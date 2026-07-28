import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  complaints: [],
};

const complaintSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {
    setComplaints: (state, action) => {
      state.complaints = action.payload;
    },

    addComplaint: (state, action) => {
      state.complaints.unshift(action.payload);
    },

    deleteComplaint: (state, action) => {
      state.complaints = state.complaints.filter(
        (item) => item.id !== action.payload
      );
    },

    updateComplaint: (state, action) => {
      const index = state.complaints.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.complaints[index] = action.payload;
      }
    },
  },
});

export const {
  setComplaints,
  addComplaint,
  deleteComplaint,
  updateComplaint,
} = complaintSlice.actions;

export default complaintSlice.reducer;