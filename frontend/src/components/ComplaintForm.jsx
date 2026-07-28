import {
  Box,
  Typography,
  Grid,
  TextField,
  Chip,
} from "@mui/material";

const ComplaintForm = ({ data }) => {
  if (!data) {
    return (
      <Typography variant="h6">
        No complaint uploaded yet.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        Complaint Details
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Customer Name"
            value={data.customer_name || ""}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Complaint Source"
            value={data.complaint_source || ""}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Product Name"
            value={data.product_name || ""}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Batch Number"
            value={data.batch_number || ""}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Manufacturing Date"
            value={data.manufacturing_date || ""}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box mt={1}>
            <Typography variant="subtitle2" mb={1}>
              Severity
            </Typography>

            <Chip
              label={data.severity || "Unknown"}
              color={
                data.severity === "High"
                  ? "error"
                  : data.severity === "Medium"
                  ? "warning"
                  : "success"
              }
            />
          </Box>
        </Grid>

        <Grid size={12}>
          <TextField
            fullWidth
            label="Priority"
            value={data.priority || "Medium"}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Complaint Description"
            value={data.complaint_description || ""}
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComplaintForm;