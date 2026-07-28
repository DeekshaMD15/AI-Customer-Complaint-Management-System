import {
  Box,
  Typography,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AICopilot = ({ data }) => {
  if (!data) {
    return (
      <Typography variant="h6">
        Upload a complaint to see AI suggestions.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        🤖 AI Copilot
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1">
          <strong>Severity:</strong>{" "}
          <Chip
            label={data.severity}
            color={
              data.severity === "High"
                ? "error"
                : data.severity === "Medium"
                ? "warning"
                : "success"
            }
            size="small"
          />
        </Typography>

        <Typography mt={2}>
          <strong>Priority:</strong> {data.priority}
        </Typography>

        <Typography mt={2} fontWeight="bold" variant="subtitle1">
          Root Cause Recommendation
        </Typography>

        <Typography color="text.secondary">
          {data.root_cause || "Unable to determine the root cause."}
        </Typography>

        <Typography mt={2} fontWeight="bold" variant="subtitle1">
          AI Risk Assessment
        </Typography>

        <Typography color="text.secondary">
          {data.risk_assessment || "No AI risk assessment available."}
        </Typography>
      </Paper>

      <Typography variant="h6" gutterBottom fontWeight="bold">
        CAPA Recommendations
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        mb={2}
      >
        Corrective and Preventive Actions (CAPA) suggested by the AI.
      </Typography>

      <List>
        {(data.recommended_actions || []).map((action, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>

            <ListItemText primary={action} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AICopilot;