import { useContext, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
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

import { login } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

type LoginLocationState = {
  message?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);

  const successMessage =
    (location.state as LoginLocationState | null)?.message ??
    "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (successMessage) {
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [
    location.pathname,
    navigate,
    successMessage,
  ]);

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

      if (result.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch {
      setErrorMessage("Invalid email or password.");
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
              SmartLend
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                textAlign: "center",
                mb: 4,
              }}
            >
              AI Loan Assessment Platform
            </Typography>

            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}

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
            />

            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            )}

            <Button
              variant="contained"
              onClick={handleLogin}
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
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <Typography
              sx={{
                textAlign: "center",
                color: "text.secondary",
                mt: 3,
              }}
            >
              Don&apos;t have an account?{" "}
              <Link to="/register">
                Create an account
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}