import { useContext, useEffect, useState } from "react";
import FeedbackAlert from "../components/FeedbackAlert";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  AlternateEmailRounded,
  ArrowForwardRounded,
  LockRounded,
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
import { login } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

type LoginLocationState = {
  message?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);

  const [successMessage] = useState(
    () =>
      (location.state as LoginLocationState | null)?.message ??
      ""
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (location.state) {
      window.history.replaceState(
        {},
        document.title,
        location.pathname
      );
    }
  }, [location.pathname, location.state]);

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage(
        "Please enter your email and password."
      );
      return;
    }

    setSubmitting(true);

    try {
      const result = await login({
        email: email.trim(),
        password,
      });

      auth.login(result.token);

      navigate(
        result.role === "Admin"
          ? "/admin"
          : "/dashboard"
      );
    } catch {
      setErrorMessage("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <Card
        sx={{
          position: "relative",
          overflow: "visible",
          border:
            "1px solid rgba(255,255,255,0.92)",
          backgroundColor: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(24px)",
          boxShadow:
            "0 34px 90px rgba(32,55,110,0.17)",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: -1,
            zIndex: -1,
            borderRadius: "21px",
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.08), rgba(6,182,212,0.13))",
          },
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
                sm: "2.45rem",
              },
              color: "#0B163F",
            }}
          >
            Welcome back
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              mt: 1,
              mb: 4,
            }}
          >
            Sign in to continue to your SmartLend account.
          </Typography>

          {successMessage && (
            <Box sx={{ mb: 2.5 }}>
              <FeedbackAlert
                severity="success"
                title="Account created"
              >
                {successMessage}
              </FeedbackAlert>
            </Box>
          )}

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
            margin="normal"
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
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleLogin();
              }
            }}
            disabled={submitting}
            autoComplete="current-password"
            fullWidth
            required
            margin="normal"
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
                title="Unable to sign in"
              >
                {errorMessage}
              </FeedbackAlert>
            </Box>
          )}

          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={submitting}
            endIcon={
              !submitting ? (
                <ArrowForwardRounded />
              ) : undefined
            }
            fullWidth
            sx={{
              mt: 3.5,
              minHeight: 56,
              borderRadius: 3.5,
              fontSize: "1rem",
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
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: "1px solid #E8EDF5",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
              }}
            >
              Don&apos;t have an account?{" "}
              <Link to="/register">
                Create an account
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}