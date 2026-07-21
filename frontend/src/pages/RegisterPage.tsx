import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FeedbackAlert from "../components/FeedbackAlert";
import {
  AlternateEmailRounded,
  ArrowForwardRounded,
  LockRounded,
  PersonRounded,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import AuthLayout from "../components/auth/AuthLayout";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";
import { register } from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    setErrorMessage("");

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage("Please complete all fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      await register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });

      navigate("/", {
        state: {
          message:
            "Account created successfully. Please sign in.",
        },
      });
    } catch (error: unknown) {
      setErrorMessage(
        getApiErrorMessage(
          error,
          "Unable to create your account."
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <Card
        sx={{
          border:
            "1px solid rgba(255,255,255,0.92)",
          backgroundColor: "rgba(255,255,255,0.84)",
          backdropFilter: "blur(24px)",
          boxShadow:
            "0 34px 90px rgba(32,55,110,0.17)",
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 3,
              sm: 5,
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.35rem",
              },
              color: "#0B163F",
            }}
          >
            Create your account
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              mt: 1,
              mb: 3,
            }}
          >
            Start submitting and tracking intelligent loan
            assessments.
          </Typography>

          <TextField
            label="Full name"
            value={fullName}
            onChange={(event) =>
              setFullName(event.target.value)
            }
            disabled={submitting}
            autoComplete="name"
            fullWidth
            required
            margin="dense"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonRounded
                      sx={{ color: "#94A3B8" }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            disabled={submitting}
            autoComplete="email"
            fullWidth
            required
            margin="dense"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailRounded
                      sx={{ color: "#94A3B8" }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            disabled={submitting}
            autoComplete="new-password"
            fullWidth
            required
            margin="dense"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded
                      sx={{ color: "#94A3B8" }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleRegister();
              }
            }}
            disabled={submitting}
            autoComplete="new-password"
            fullWidth
            required
            margin="dense"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded
                      sx={{ color: "#94A3B8" }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          {errorMessage && (
            <Box sx={{ mt: 2 }}>
              <FeedbackAlert
                severity="error"
                title="Account not created"
              >
                {errorMessage}
              </FeedbackAlert>
            </Box>
          )}

          <Button
            variant="contained"
            onClick={handleRegister}
            disabled={submitting}
            endIcon={
              !submitting ? (
                <ArrowForwardRounded />
              ) : undefined
            }
            fullWidth
            sx={{
              mt: 3,
              minHeight: 56,
              borderRadius: 3.5,
              background:
                "linear-gradient(110deg, #2563EB 0%, #4F46E5 48%, #7C3AED 100%)",
              boxShadow:
                "0 16px 34px rgba(79,70,229,0.28)",
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
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>

          <Box
            sx={{
              mt: 3,
              pt: 3,
              borderTop: "1px solid #E8EDF5",
              textAlign: "center",
            }}
          >
            <Typography color="text.secondary">
              Already have an account?{" "}
              <Link to="/">Sign in</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}