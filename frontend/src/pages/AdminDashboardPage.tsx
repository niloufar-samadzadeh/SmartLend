import { useEffect, useMemo, useState } from "react";
import {
  AssignmentRounded,
  CheckCircleRounded,
  HourglassTopRounded,
  CancelRounded,
  DoneRounded,
  CloseRounded,
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
import {
  getAllApplications,
  updateLoanDecision,
} from "../services/loanService";
import type { LoanApplication } from "../types/loan";

export default function AdminDashboardPage() {
  const [applications, setApplications] =
    useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] =
    useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      setErrorMessage("");
      const data = await getAllApplications();
      setApplications(data);
    } catch {
      setErrorMessage(
        "The application list could not be loaded. Please refresh the page."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDecision(
    id: number,
    status: 2 | 3
  ) {
    try {
      setErrorMessage("");
      setUpdatingId(id);
      await updateLoanDecision(id, status);
      await loadApplications();
    } catch {
      setErrorMessage(
        "The loan decision could not be updated. Please try again."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  const stats = useMemo(
    () => ({
      total: applications.length,
      approved: applications.filter(
        (item) => item.status === "Approved"
      ).length,
      pending: applications.filter(
        (item) => item.status === "Pending"
      ).length,
      rejected: applications.filter(
        (item) => item.status === "Rejected"
      ).length,
    }),
    [applications]
  );

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
        }}
      />
    );
  };

  return (
    <AppLayout admin>
      <PageHeader
        eyebrow="Administrative workspace"
        title="Loan management"
        description="Review risk assessments and manage lending decisions across all submitted applications."
      />

      {errorMessage && (
        <Box sx={{ mb: 3 }}>
          <FeedbackAlert
            severity="error"
            title="Action unsuccessful"
          >
            {errorMessage}
          </FeedbackAlert>
        </Box>
      )}

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <StatCard
            label="All applications"
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
              borderBottom: "1px solid #EDF1F7",
            }}
          >
            <Typography variant="h6">
              Application review queue
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                color: "text.secondary",
                fontSize: "0.88rem",
              }}
            >
              Approve or reject applications based on their
              submitted information and calculated risk.
            </Typography>
          </Box>

          {loading ? (
            <Box
              sx={{
                minHeight: 280,
                display: "grid",
                placeItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 900 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Application</TableCell>
                    <TableCell>Income</TableCell>
                    <TableCell>Loan amount</TableCell>
                    <TableCell>Risk score</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">
                      Decision
                    </TableCell>
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
                        $
                        {application.monthlyIncome.toLocaleString()}
                      </TableCell>

                      <TableCell>
                        $
                        {application.loanAmount.toLocaleString()}
                      </TableCell>

                      <TableCell>
                        {application.riskScore === null
                          ? "Not available"
                          : application.riskScore.toFixed(2)}
                      </TableCell>

                      <TableCell>
                        {getStatusChip(application.status)}
                      </TableCell>

                      <TableCell align="right">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1,
                          }}
                        >
                          <Button
                            size="small"
                            variant="outlined"
                            color="success"
                            startIcon={<DoneRounded />}
                            disabled={
                              updatingId === application.id ||
                              application.status === "Approved"
                            }
                            onClick={() =>
                              handleDecision(
                                application.id,
                                2
                              )
                            }
                          >
                            Approve
                          </Button>

                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<CloseRounded />}
                            disabled={
                              updatingId === application.id ||
                              application.status === "Rejected"
                            }
                            onClick={() =>
                              handleDecision(
                                application.id,
                                3
                              )
                            }
                          >
                            Reject
                          </Button>
                        </Box>
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