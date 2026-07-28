import { useEffect, useState } from "react";

import {getComplaints,
deleteComplaint,
} from "../services/historyService";
import { updateComplaint } from "../services/updateService";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  MenuItem,
  TablePagination,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState([]);

  const [search, setSearch] = useState("");

  const [severityFilter, setSeverityFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  

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

  const filteredComplaints = complaints.filter((item) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      item.customer_name.toLowerCase().includes(keyword) ||
      item.product_name.toLowerCase().includes(keyword) ||
      item.batch_number.toLowerCase().includes(keyword);

    const matchesSeverity =
      severityFilter === "All" ||
      item.severity === severityFilter;

    const matchesStatus =
      statusFilter === "All" ||
      item.status === statusFilter;

    return (
      matchesSearch &&
      matchesSeverity &&
      matchesStatus
    );
  });

  const paginatedComplaints = filteredComplaints.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const handleUpdate = async () => {
  try {
    await updateComplaint(
      selectedComplaint.id,
      selectedComplaint
    );
    

    setEditDialog(false);

    loadComplaints();

    alert("Complaint Updated Successfully");

  } catch (error) {
    console.error(error);
    alert("Update Failed");
  }
};

const handleDelete = async (id) => {
  console.log("Delete clicked", id);

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this complaint?"
  );

  if (!confirmDelete) return;

  try {
  await deleteComplaint(id);

  alert("Complaint deleted successfully");

  loadComplaints();

} catch (error) {
  console.error(error);
  alert("Delete failed");
}
};

  return (
    <Paper
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        mb={2}
        fontWeight="bold"
      >
        Complaint History
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 180px 180px",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          label="Search"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          fullWidth
        />

        <TextField
          select
          label="Severity"
          value={severityFilter}
          onChange={(e) =>
            setSeverityFilter(e.target.value)
          }
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>

        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="New">New</MenuItem>
          <MenuItem value="Pending">
            Pending
          </MenuItem>
          <MenuItem value="Resolved">
            Resolved
          </MenuItem>
        </TextField>
      </Box>
            <TableContainer>
        <Table>

          <TableHead>
            <TableRow>

              <TableCell>
                <b>ID</b>
              </TableCell>

              <TableCell>
                <b>Customer</b>
              </TableCell>

              <TableCell>
                <b>Product</b>
              </TableCell>

              <TableCell>
                <b>Severity</b>
              </TableCell>

              <TableCell>
                <b>Status</b>
              </TableCell>

              <TableCell>
                <b>Date</b>
              </TableCell>

              <TableCell align="center">
                <b>Actions</b>
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>

            {paginatedComplaints.map((item) => (

              <TableRow key={item.id}>

                <TableCell>
                  {item.id}
                </TableCell>

                <TableCell>
                  {item.customer_name}
                </TableCell>

                <TableCell>
                  {item.product_name}
                </TableCell>

                <TableCell>

                  <Chip
                    label={item.severity}
                    color={
                      item.severity === "High"
                        ? "error"
                        : item.severity === "Medium"
                        ? "warning"
                        : "success"
                    }
                  />

                </TableCell>

                <TableCell>

                  <Chip
                    label={item.status}
                    color="primary"
                  />

                </TableCell>

                <TableCell>

                  {new Date(
                    item.created_at
                  ).toLocaleString()}

                </TableCell>

                <TableCell align="center">

                  <Tooltip title="View">

                    <IconButton
                      color="primary"
                      onClick={() => {
                        setSelectedComplaint(item);
                        setOpenDialog(true);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>

                  </Tooltip>

                  <Tooltip title="Edit">

                    <IconButton 
                    color="warning"
                    onClick={() => {
                      setSelectedComplaint({ ...item });
                      setEditDialog(true);  
                    }}
                  >
                      <EditIcon />
                    </IconButton>

                  </Tooltip>

                  <Tooltip title="Delete">

                    <IconButton color="error"
                     onClick={() => handleDelete(item.id)}
                     >
                      <DeleteIcon />
                    </IconButton>

                  </Tooltip>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

      <TablePagination
        component="div"
        count={filteredComplaints.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(event, newPage) =>
          setPage(newPage)
        }
        onRowsPerPageChange={(event) => {
          setRowsPerPage(
            parseInt(event.target.value, 10)
          );
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 20]}
      />
            
            <Dialog
  open={editDialog}
  onClose={() => setEditDialog(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>Edit Complaint</DialogTitle>

  <DialogContent>

    <TextField
      fullWidth
      margin="normal"
      label="Customer Name"
      value={selectedComplaint?.customer_name || ""}
      onChange={(e) =>
        setSelectedComplaint({
          ...selectedComplaint,
          customer_name: e.target.value,
        })
      }
    />

    <TextField
      fullWidth
      margin="normal"
      label="Product Name"
      value={selectedComplaint?.product_name || ""}
      onChange={(e) =>
        setSelectedComplaint({
          ...selectedComplaint,
          product_name: e.target.value,
        })
      }
    />

    <TextField
      fullWidth
      margin="normal"
      label="Batch Number"
      value={selectedComplaint?.batch_number || ""}
      onChange={(e) =>
        setSelectedComplaint({
          ...selectedComplaint,
          batch_number: e.target.value,
        })
      }
    />

    <TextField
      fullWidth
      margin="normal"
      label="Severity"
      value={selectedComplaint?.severity || ""}
      onChange={(e) =>
        setSelectedComplaint({
          ...selectedComplaint,
          severity: e.target.value,
        })
      }
    />

    <TextField
      fullWidth
      margin="normal"
      label="Status"
      value={selectedComplaint?.status || ""}
      onChange={(e) =>
        setSelectedComplaint({
          ...selectedComplaint,
          status: e.target.value,
        })
      }
    />

    <TextField
      fullWidth
      margin="normal"
      multiline
      rows={4}
      label="Complaint Description"
      value={selectedComplaint?.complaint_description || ""}
      onChange={(e) =>
        setSelectedComplaint({
          ...selectedComplaint,
          complaint_description: e.target.value,
        })
      }
    />

  </DialogContent>

  
  <DialogActions>

  <Button
    onClick={() => setEditDialog(false)}
  >
    Cancel
  </Button>

  <Button
    variant="contained"
    onClick={handleUpdate}
  >
    Save Changes
  </Button>

</DialogActions>

</Dialog>

<Dialog
  open={openDialog}
  onClose={() => setOpenDialog(false)}
  maxWidth="sm"
  fullWidth
>

  <DialogTitle>
          Complaint Details
        </DialogTitle>

        <DialogContent dividers>

          {selectedComplaint && (
            <>

              <Typography sx={{ mb: 1 }}>
                <b>Customer:</b> {selectedComplaint.customer_name}
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <b>Complaint Source:</b> {selectedComplaint.complaint_source}
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <b>Product:</b> {selectedComplaint.product_name}
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <b>Batch Number:</b> {selectedComplaint.batch_number}
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <b>Manufacturing Date:</b>{" "}
                {selectedComplaint.manufacturing_date}
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <b>Severity:</b> {selectedComplaint.severity}
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <b>Status:</b> {selectedComplaint.status}
              </Typography>

              <Typography sx={{ mt: 2 }}>
                <b>Description</b>
              </Typography>

              <Typography>
                {selectedComplaint.complaint_description}
              </Typography>

            </>
          )}

        </DialogContent>

        <DialogActions>

          <Button
            variant="contained"
            onClick={() => setOpenDialog(false)}
          >
            Close
          </Button>

        </DialogActions>

      </Dialog>

    </Paper>
  );
};

export default ComplaintHistory;