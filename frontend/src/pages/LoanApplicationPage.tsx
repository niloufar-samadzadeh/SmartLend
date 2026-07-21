import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowBackRounded,
  AutoAwesomeRounded,
  CheckCircleRounded,
  SendRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import AppLayout from "../components/AppLayout";
import FeedbackAlert from "../components/FeedbackAlert";
import PageHeader from "../components/PageHeader";
import { createLoanApplication } from "../services/loanService";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

interface SubmissionResult {
  riskScore: number | null;
  status: string;
}

export default function LoanApplicationPage() {
  const navigate = useNavigate();

  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [employmentStatus, setEmploymentStatus] =
    useState("Full-time");
  const [employmentYears, setEmploymentYears] =
    useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [existingDebt, setExistingDebt] = useState("");
  const [creditHistoryMonths, setCreditHistoryMonths] =
    useState("");

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] =
    useState<SubmissionResult | null>(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    setResult(null);

    if (
      monthlyIncome === "" ||
      employmentYears === "" ||
      loanAmount === "" ||
      !loanPurpose.trim() ||
      existingDebt === "" ||
      creditHistoryMonths === ""
    ) {
      setErrorMessage(
        "Please complete all required fields before submitting the application."
      );
      return;
    }

    setSubmitting(true);

    try {
      const response = await createLoanApplication({
        monthlyIncome: Number(monthlyIncome),
        employmentStatus,
        employmentYears: Number(employmentYears),
        loanAmount: Number(loanAmount),
        loanPurpose: loanPurpose.trim(),
        existingDebt: Number(existingDebt),
        creditHistoryMonths: Number(creditHistoryMonths),
      });

      setResult({
        riskScore: response.riskScore,
        status: response.status,
      });

      setSuccessMessage(
        "Your loan application was submitted successfully."
      );
    } catch (error: unknown) {
      setErrorMessage(
        getApiErrorMessage(
          error,
          "The application could not be submitted. Please review your information and try again."
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resultSeverity =
    result?.status === "Approved"
      ? "success"
      : result?.status === "Rejected"
        ? "error"
        : "warning";

  return (
    <AppLayout>
      <PageHeader
        eyebrow="AI-powered assessment"
        title="New loan application"
        description="Provide your financial and employment information to receive an automated risk assessment."
        action={
          <Button
            variant="outlined"
            startIcon={<ArrowBackRounded />}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
        }
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent
              sx={{
                p: {
                  xs: 2.5,
                  sm: 4,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 3,
                    color: "#4F46E5",
                    backgroundColor:
                      "rgba(99,102,241,0.1)",
                  }}
                >
                  <AutoAwesomeRounded />
                </Box>

                <Box>
                  <Typography variant="h6">
                    Application details
                  </Typography>

                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.86rem",
                    }}
                  >
                    All fields are required.
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2.3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Monthly income"
                    type="number"
                    value={monthlyIncome}
                    onChange={(event) =>
                      setMonthlyIncome(event.target.value)
                    }
                    fullWidth
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    label="Employment status"
                    value={employmentStatus}
                    onChange={(event) =>
                      setEmploymentStatus(event.target.value)
                    }
                    fullWidth
                    required
                  >
                    <MenuItem value="Full-time">
                      Full-time
                    </MenuItem>
                    <MenuItem value="Part-time">
                      Part-time
                    </MenuItem>
                    <MenuItem value="Self-employed">
                      Self-employed
                    </MenuItem>
                    <MenuItem value="Unemployed">
                      Unemployed
                    </MenuItem>
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Years of employment"
                    type="number"
                    value={employmentYears}
                    onChange={(event) =>
                      setEmploymentYears(event.target.value)
                    }
                    fullWidth
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Requested loan amount"
                    type="number"
                    value={loanAmount}
                    onChange={(event) =>
                      setLoanAmount(event.target.value)
                    }
                    fullWidth
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="Loan purpose"
                    value={loanPurpose}
                    onChange={(event) =>
                      setLoanPurpose(event.target.value)
                    }
                    fullWidth
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Existing debt"
                    type="number"
                    value={existingDebt}
                    onChange={(event) =>
                      setExistingDebt(event.target.value)
                    }
                    fullWidth
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Credit history in months"
                    type="number"
                    value={creditHistoryMonths}
                    onChange={(event) =>
                      setCreditHistoryMonths(
                        event.target.value
                      )
                    }
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

              {errorMessage && (
                <Box sx={{ mt: 2.5 }}>
                  <FeedbackAlert
                    severity="error"
                    title="Application not submitted"
                  >
                    {errorMessage}
                  </FeedbackAlert>
                </Box>
              )}

              <Button
                variant="contained"
                size="large"
                startIcon={
                  submitting ? undefined : <SendRounded />
                }
                onClick={handleSubmit}
                disabled={submitting}
                fullWidth
                sx={{
                  mt: 3,
                  minHeight: 56,
                  borderRadius: 3.5,
                }}
              >
                {submitting ? (
                  <>
                    <CircularProgress
                      size={20}
                      sx={{
                        color: "inherit",
                        mr: 1,
                      }}
                    />
                    Assessing application...
                  </>
                ) : (
                  "Submit for assessment"
                )}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            sx={{
              position: { lg: "sticky" },
              top: { lg: 32 },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6">
                How assessment works
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  mb: 3,
                  color: "text.secondary",
                  fontSize: "0.9rem",
                }}
              >
                SmartLend evaluates the submitted information
                through its risk-scoring service.
              </Typography>

              {[
                "Your financial information is validated.",
                "The AI service calculates a risk score.",
                "The application is stored for review.",
              ].map((item, index) => (
                <Box
                  key={item}
                  sx={{
                    display: "flex",
                    gap: 1.4,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      borderRadius: 2,
                      color: "#4F46E5",
                      fontWeight: 800,
                      fontSize: "0.8rem",
                      backgroundColor:
                        "rgba(99,102,241,0.1)",
                    }}
                  >
                    {index + 1}
                  </Box>

                  <Typography
                    sx={{
                      color: "#526078",
                      fontSize: "0.88rem",
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}

              {result && (
                <Box sx={{ mt: 3 }}>
                  <FeedbackAlert
                    severity={resultSeverity}
                    title="Assessment completed"
                  >
                    Status: {result.status}
                    <br />
                    Risk score:{" "}
                    {result.riskScore === null
                      ? "Not available"
                      : result.riskScore.toFixed(2)}
                  </FeedbackAlert>

                  <Button
                    variant="outlined"
                    startIcon={<CheckCircleRounded />}
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => navigate("/dashboard")}
                  >
                    View dashboard
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Box>
          <FeedbackAlert
            severity="success"
            title="Application submitted"
            onClose={() => setSuccessMessage("")}
          >
            {successMessage}
          </FeedbackAlert>
        </Box>
      </Snackbar>
    </AppLayout>
  );
}