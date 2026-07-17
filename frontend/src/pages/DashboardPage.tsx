import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { AuthContext } from "../contexts/AuthContext";
import { getMyApplications } from "../services/loanService";
import type { LoanApplication } from "../types/loan";

export default function DashboardPage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      const data = await getMyApplications();
      setApplications(data);
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    const approved = applications.filter(
      (application) => application.status === "Approved"
    ).length;

    const pending = applications.filter(
      (application) => application.status === "Pending"
    ).length;

    const rejected = applications.filter(
      (application) => application.status === "Rejected"
    ).length;

    return {
      total: applications.length,
      approved,
      pending,
      rejected,
    };
  }, [applications]);

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

  const statCards = [
    { label: "Applications", value: stats.total },
    { label: "Approved", value: stats.approved },
    { label: "Pending", value: stats.pending },
    { label: "Rejected", value: stats.rejected },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SmartLend
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Stack
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                }}
              >
                Dashboard
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  mt: 1,
                }}
              >
                Manage your loan applications.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/apply")}
            >
              New Loan Application
            </Button>
          </Stack>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {statCards.map((stat) => (
              <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card>
                  <CardContent>
                    <Typography
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      {stat.label}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mt: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                }}
              >
                My Applications
              </Typography>

              {loading ? (
                <CircularProgress />
              ) : applications.length === 0 ? (
                <Typography
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  You have not submitted any loan applications yet.
                </Typography>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Risk</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Submitted</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>{application.id}</TableCell>

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
                          {new Date(
                            application.submittedAt
                          ).toLocaleDateString()}
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