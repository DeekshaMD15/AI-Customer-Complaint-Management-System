import { useState } from "react";
import { uploadComplaint } from "../services/complaintService";

import {
  Typography,
  Button,
  Stack
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadPanel = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file");
      return;
    }

    try {
      const data = await uploadComplaint(file);

      onUploadSuccess(data.structured_data);

      alert("Complaint Uploaded Successfully");
    } catch (err) {
      console.error(err);
      alert("Upload Failed");
    }
  };

  return (
    <Stack spacing={3}>

      <Typography variant="h5" fontWeight="bold">
        Upload Complaint
      </Typography>

      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUploadIcon />}
      >
        Choose File

        <input
          hidden
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </Button>

      <Typography>

        {file
          ? file.name
          : "No file selected"}

      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={handleUpload}
      >
        Upload
      </Button>

    </Stack>
  );
};

export default UploadPanel;