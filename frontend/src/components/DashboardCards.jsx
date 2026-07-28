import { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";

import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { getComplaints } from "../services/historyService";

const DashboardCards = () => {
  const [complaints, setComplaints] = useState([]);

  const loadComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  loadComplaints();
}, []);


  const totalComplaints = complaints.length;

  const highPriority = complaints.filter(
    (c) => c.priority === "High"
  ).length;

  const pending = complaints.filter(
    (c) => c.status === "New"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const cards = [
    {
      title: "Total Complaints",
      value: totalComplaints,
      icon: <ReportProblemIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
      title: "High Priority",
      value: highPriority,
      icon: <WarningAmberIcon sx={{ fontSize: 40, color: "#d32f2f" }} />,
    },
    {
      title: "Pending",
      value: pending,
      icon: <PendingActionsIcon sx={{ fontSize: 40, color: "#f57c00" }} />,
    },
    {
      title: "Resolved",
      value: resolved,
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, sm: 6, md: 3 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Typography variant="subtitle1">
                {card.title}
              </Typography>

              <Typography variant="h4" fontWeight="bold">
                {card.value}
              </Typography>
            </div>

            {card.icon}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;