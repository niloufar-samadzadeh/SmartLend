import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";

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
    } catch {
      setErrorMessage(
        "An account with this email may already exist."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          py: 4,
        }}
      >
        <Card sx={{ width: "100%", p: 2 }}>
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Create Account
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                textAlign: "center",
                mb: 4,
              }}
            >
              Register to submit and track loan applications.
            </Typography>

            <TextField
              label="Full Name"
              value={fullName}
              onChange={(event) =>
                setFullName(event.target.value)
              }
              disabled={submitting}
              autoComplete="name"
              fullWidth
              required
              margin="normal"
            />

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              disabled={submitting}
              autoComplete="email"
              fullWidth
              required
              margin="normal"
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
              margin="normal"
            />

            <TextField
              label="Confirm Password"
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
              margin="normal"
            />

            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            )}

            <Button
              variant="contained"
              onClick={handleRegister}
              disabled={submitting}
              fullWidth
              sx={{ mt: 3 }}
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                mt: 3,
              }}
            >
              Already have an account?{" "}
              <Link to="/">Sign in</Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}