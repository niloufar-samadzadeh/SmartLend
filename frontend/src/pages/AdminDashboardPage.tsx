import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";

import { AuthContext } from "../contexts/AuthContext";
import {
  getAllApplications,
  updateLoanDecision,
} from "../services/loanService";
import type { LoanApplication } from "../types/loan";

export default function AdminDashboardPage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      setError("");
      const data = await getAllApplications();
      setApplications(data);
    } catch {
      setError("Unable to load loan applications.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDecision(id: number, status: 2 | 3) {
    try {
      await updateLoanDecision(id, status);
      await loadApplications();
    } catch {
      setError("Unable to update the loan decision.");
    }
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case "Approved":
        return <Chip label="Approved" color="success" />;
      case "Rejected":
        return <Chip label="Rejected" color="error" />;
      default:
        return <Chip label="Pending" color="warning" />;
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SmartLend Admin
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Admin Dashboard
          </Typography>

          <Typography sx={{ color: "text.secondary", mt: 1 }}>
            Review and manage all loan applications.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}

          <Card sx={{ mt: 4 }}>
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Income</TableCell>
                      <TableCell>Loan Amount</TableCell>
                      <TableCell>Risk</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>{application.id}</TableCell>

                        <TableCell>
                          ${application.monthlyIncome.toLocaleString()}
                        </TableCell>

                        <TableCell>
                          ${application.loanAmount.toLocaleString()}
                        </TableCell>

                        <TableCell>
                          {application.riskScore === null
                            ? "N/A"
                            : application.riskScore.toFixed(2)}
                        </TableCell>

                        <TableCell>
                          {getStatusChip(application.status)}
                        </TableCell>

                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              disabled={application.status === "Approved"}
                              onClick={() =>
                                handleDecision(application.id, 2)
                              }
                            >
                              Approve
                            </Button>

                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              disabled={application.status === "Rejected"}
                              onClick={() =>
                                handleDecision(application.id, 3)
                              }
                            >
                              Reject
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}