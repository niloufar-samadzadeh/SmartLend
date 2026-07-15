import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../contexts/AuthContext";

export default function DashboardPage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
            spacing={2}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700 }}
              >
                Dashboard
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  mt: 1,
                }}
              >
                Manage your loan applications and review their status.
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

          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600 }}
              >
                My Applications
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  mt: 2,
                }}
              >
                Your submitted loan applications will appear here.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}