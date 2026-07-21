import { useContext, useState } from "react";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AddCircleOutlineRounded,
  AdminPanelSettingsRounded,
  DashboardRounded,
  LogoutRounded,
  MenuRounded,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { AuthContext } from "../contexts/AuthContext";
import SmartLendLogo from "./SmartLendLogo";

interface AppLayoutProps {
  children: ReactNode;
  admin?: boolean;
}

const drawerWidth = 270;

export default function AppLayout({
  children,
  admin = false,
}: AppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navigationItems = admin
    ? [
        {
          label: "Admin Dashboard",
          path: "/admin",
          icon: <AdminPanelSettingsRounded />,
        },
      ]
    : [
        {
          label: "Dashboard",
          path: "/dashboard",
          icon: <DashboardRounded />,
        },
        {
          label: "New Application",
          path: "/apply",
          icon: <AddCircleOutlineRounded />,
        },
      ];

  const sidebar = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2.5,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(247,249,255,0.98))",
      }}
    >
      <Box sx={{ px: 1, pt: 0.5, pb: 4 }}>
        <SmartLendLogo compact />
      </Box>

      <Typography
        sx={{
          px: 1.5,
          mb: 1.2,
          color: "#94A3B8",
          fontSize: "0.72rem",
          fontWeight: 750,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Workspace
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.8,
        }}
      >
        {navigationItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              startIcon={item.icon}
              sx={{
                justifyContent: "flex-start",
                minHeight: 50,
                borderRadius: 3,
                px: 1.6,
                color: active ? "#3730A3" : "#64748B",
                background: active
                  ? "linear-gradient(135deg, rgba(37,99,235,0.11), rgba(124,58,237,0.09))"
                  : "transparent",

                "& .MuiButton-startIcon": {
                  color: active ? "#4F46E5" : "#94A3B8",
                },

                "&:hover": {
                  backgroundColor: active
                    ? "rgba(99,102,241,0.12)"
                    : "rgba(148,163,184,0.08)",
                },
              }}
            >
              {item.label}
            </Button>
          );
        })}
      </Box>

      <Box sx={{ mt: "auto" }}>
        <Box
          sx={{
            p: 2,
            mb: 1.5,
            borderRadius: 4,
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.07))",
            border: "1px solid rgba(99,102,241,0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.3,
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background:
                  "linear-gradient(135deg, #2563EB, #7C3AED)",
              }}
            >
              {admin ? "A" : "U"}
            </Avatar>

            <Box>
              <Typography
                sx={{
                  fontWeight: 750,
                  fontSize: "0.9rem",
                  color: "#172554",
                }}
              >
                {admin ? "Administrator" : "SmartLend User"}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.76rem",
                }}
              >
                {admin ? "Loan management" : "Personal workspace"}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          fullWidth
          startIcon={<LogoutRounded />}
          onClick={handleLogout}
          sx={{
            justifyContent: "flex-start",
            color: "#64748B",

            "&:hover": {
              color: "#DC2626",
              backgroundColor: "rgba(239,68,68,0.07)",
            },
          }}
        >
          Sign out
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #F7F9FE 0%, #F2F5FC 48%, #F8F5FF 100%)",
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          display: { md: "none" },
          backgroundColor: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(226,232,240,0.8)",
          color: "#0F172A",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 1.5 }}
          >
            <MenuRounded />
          </IconButton>

          <SmartLendLogo compact />

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Sign out">
            <IconButton onClick={handleLogout}>
              <LogoutRounded />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },

            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: 0,
            },
          }}
        >
          {sidebar}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },

            "& .MuiDrawer-paper": {
              width: drawerWidth,
              borderRight: "1px solid rgba(226,232,240,0.8)",
              boxShadow: "12px 0 45px rgba(15,23,42,0.035)",
            },
          }}
        >
          {sidebar}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          ml: { md: `${drawerWidth}px` },
          pt: { xs: 10, md: 0 },
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -180,
            right: -130,
            width: 430,
            height: 430,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.11), transparent 68%)",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: -200,
            left: -150,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.08), transparent 68%)",
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            py: {
              xs: 3,
              sm: 4,
              lg: 5,
            },
            px: {
              xs: 2,
              sm: 3,
              lg: 5,
            },
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}