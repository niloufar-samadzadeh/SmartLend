import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddRounded,
  AssignmentRounded,
  CheckCircleRounded,
  HourglassTopRounded,
  CancelRounded,
  InboxRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import AppLayout from "../components/AppLayout";
import FeedbackAlert from "../components/FeedbackAlert";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { getMyApplications } from "../services/loanService";
import type { LoanApplication } from "../types/loan";

export default function DashboardPage() {
  const navigate = useNavigate();

  const [applications, setApplications] =
    useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      setErrorMessage("");
      const data = await getMyApplications();
      setApplications(data);
    } catch {
      setErrorMessage(
        "We could not load your applications. Please refresh the page and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    return {
      total: applications.length,
      approved: applications.filter(
        (application) => application.status === "Approved"
      ).length,
      pending: applications.filter(
        (application) => application.status === "Pending"
      ).length,
      rejected: applications.filter(
        (application) => application.status === "Rejected"
      ).length,
    };
  }, [applications]);

  const getStatusChip = (status: string) => {
    const styles = {
      Approved: {
        color: "#15803D",
        backgroundColor: "rgba(34,197,94,0.11)",
      },
      Rejected: {
        color: "#B91C1C",
        backgroundColor: "rgba(239,68,68,0.1)",
      },
      Pending: {
        color: "#A16207",
        backgroundColor: "rgba(245,158,11,0.12)",
      },
    };

    const style =
      styles[status as keyof typeof styles] ??
      styles.Pending;

    return (
      <Chip
        label={status}
        size="small"
        sx={{
          fontWeight: 700,
          color: style.color,
          backgroundColor: style.backgroundColor,
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      />
    );
  };

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Personal lending workspace"
        title="Welcome back"
        description="Track your applications, review lending decisions and submit a new request from one place."
        action={
          <Button
            variant="contained"
            startIcon={<AddRounded />}
            onClick={() => navigate("/apply")}
            sx={{
              minHeight: 52,
              borderRadius: 3.5,
            }}
          >
            New application
          </Button>
        }
      />

      {errorMessage && (
        <Box sx={{ mb: 3 }}>
          <FeedbackAlert
            severity="error"
            title="Applications unavailable"
          >
            {errorMessage}
          </FeedbackAlert>
        </Box>
      )}

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <StatCard
            label="Total applications"
            value={stats.total}
            icon={<AssignmentRounded />}
            accent="#2563EB"
            softAccent="rgba(37,99,235,0.1)"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <StatCard
            label="Approved"
            value={stats.approved}
            icon={<CheckCircleRounded />}
            accent="#16A34A"
            softAccent="rgba(34,197,94,0.1)"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <StatCard
            label="Pending review"
            value={stats.pending}
            icon={<HourglassTopRounded />}
            accent="#D97706"
            softAccent="rgba(245,158,11,0.11)"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <StatCard
            label="Rejected"
            value={stats.rejected}
            icon={<CancelRounded />}
            accent="#DC2626"
            softAccent="rgba(239,68,68,0.09)"
          />
        </Grid>
      </Grid>

      <Card sx={{ mt: 3.5, overflow: "hidden" }}>
        <CardContent sx={{ p: 0 }}>
          <Box
            sx={{
              px: { xs: 2.5, sm: 3.5 },
              py: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #EDF1F7",
            }}
          >
            <Box>
              <Typography variant="h6">
                Recent applications
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,
                  color: "text.secondary",
                  fontSize: "0.88rem",
                }}
              >
                Your latest loan submissions and decisions.
              </Typography>
            </Box>
          </Box>

          {loading ? (
            <Box
              sx={{
                minHeight: 260,
                display: "grid",
                placeItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : applications.length === 0 ? (
            <Box
              sx={{
                py: 8,
                px: 3,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  display: "grid",
                  placeItems: "center",
                  mx: "auto",
                  borderRadius: 4,
                  color: "#6366F1",
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.1))",
                }}
              >
                <InboxRounded sx={{ fontSize: 34 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{ mt: 2.2 }}
              >
                No applications yet
              </Typography>

              <Typography
                sx={{
                  mt: 0.7,
                  color: "text.secondary",
                }}
              >
                Submit your first application to receive an AI
                risk assessment.
              </Typography>

              <Button
                variant="contained"
                startIcon={<AddRounded />}
                onClick={() => navigate("/apply")}
                sx={{ mt: 2.5 }}
              >
                Start application
              </Button>
            </Box>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 720 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Application</TableCell>
                    <TableCell>Loan amount</TableCell>
                    <TableCell>Risk score</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Submitted</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {applications.map((application) => (
                    <TableRow
                      key={application.id}
                      sx={{
                        "&:last-child td": {
                          borderBottom: 0,
                        },

                        "&:hover": {
                          backgroundColor:
                            "rgba(248,250,252,0.8)",
                        },
                      }}
                    >
                      <TableCell>
                        <Typography sx={{ fontWeight: 700 }}>
                          #{application.id}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        ${application.loanAmount.toLocaleString()}
                      </TableCell>

                      <TableCell>
                        {application.riskScore === null
                          ? "Not available"
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
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
}