import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { createLoanApplication } from "../services/loanService";

interface SubmissionResult {
  riskScore: number | null;
  status: string;
}

export default function LoanApplicationPage() {
  const navigate = useNavigate();

  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [employmentStatus, setEmploymentStatus] =
    useState("Full-time");
  const [employmentYears, setEmploymentYears] = useState("");
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
      !monthlyIncome ||
      !employmentYears ||
      !loanAmount ||
      !loanPurpose.trim() ||
      !existingDebt ||
      !creditHistoryMonths
    ) {
      setErrorMessage("Please complete all required fields.");
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
        "Loan application submitted successfully."
      );
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "The application could not be submitted. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getResultSeverity = () => {
    if (result?.status === "Approved") {
      return "success";
    }

    if (result?.status === "Rejected") {
      return "error";
    }

    return "warning";
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          New Loan Application
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mt: 1,
          }}
        >
          Complete the form to receive an automated risk
          assessment.
        </Typography>

        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Stack spacing={3}>
              <TextField
                label="Monthly Income"
                type="number"
                value={monthlyIncome}
                onChange={(event) =>
                  setMonthlyIncome(event.target.value)
                }
                required
                fullWidth
              />

              <TextField
                select
                label="Employment Status"
                value={employmentStatus}
                onChange={(event) =>
                  setEmploymentStatus(event.target.value)
                }
                required
                fullWidth
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

              <TextField
                label="Years of Employment"
                type="number"
                value={employmentYears}
                onChange={(event) =>
                  setEmploymentYears(event.target.value)
                }
                required
                fullWidth
              />

              <TextField
                label="Loan Amount"
                type="number"
                value={loanAmount}
                onChange={(event) =>
                  setLoanAmount(event.target.value)
                }
                required
                fullWidth
              />

              <TextField
                label="Loan Purpose"
                value={loanPurpose}
                onChange={(event) =>
                  setLoanPurpose(event.target.value)
                }
                required
                fullWidth
              />

              <TextField
                label="Existing Debt"
                type="number"
                value={existingDebt}
                onChange={(event) =>
                  setExistingDebt(event.target.value)
                }
                required
                fullWidth
              />

              <TextField
                label="Credit History (Months)"
                type="number"
                value={creditHistoryMonths}
                onChange={(event) =>
                  setCreditHistoryMonths(event.target.value)
                }
                required
                fullWidth
              />

              {errorMessage && (
                <Alert severity="error">
                  {errorMessage}
                </Alert>
              )}

              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={submitting}
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
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>

              {result && (
                <Card variant="outlined">
                  <CardContent>
                    <Alert severity={getResultSeverity()}>
                      Application assessment completed.
                    </Alert>

                    <Typography
                      sx={{
                        mt: 2,
                        fontWeight: 600,
                      }}
                    >
                      Status: {result.status}
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                      Risk Score:{" "}
                      {result.riskScore === null
                        ? "Not available"
                        : result.riskScore.toFixed(2)}
                    </Typography>

                    <Button
                      variant="outlined"
                      sx={{ mt: 3 }}
                      onClick={() => navigate("/dashboard")}
                    >
                      Back to Dashboard
                    </Button>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}