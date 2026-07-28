import { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";

import UploadPanel from "../components/UploadPanel";
import ComplaintForm from "../components/ComplaintForm";
import AICopilot from "../components/AICopilot";
import DashboardCards from "../components/DashboardCards";
import ComplaintHistory from "../components/ComplaintHistory";

const Dashboard = () => {
  const [complaint, setComplaint] = useState(null);
  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F7FB",
        p: 4,
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={4}>
        AI Customer Complaint Management System
      </Typography>
      <DashboardCards />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "280px 1fr 320px",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        {/* Upload Panel */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <UploadPanel onUploadSuccess={setComplaint} />
        </Paper>

        {/* Complaint Form */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <ComplaintForm data={complaint} />
        </Paper>

        {/* AI Assistant */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <AICopilot data={complaint} />
        </Paper>
      </Box>
            {/* Complaint History */}
      <ComplaintHistory />
    </Box>
  );
};

export default Dashboard;