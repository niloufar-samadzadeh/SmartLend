import type { ReactNode } from "react";
import {
  CheckCircleRounded,
  ErrorRounded,
  InfoRounded,
  WarningAmberRounded,
} from "@mui/icons-material";
import { Alert, Box, Typography } from "@mui/material";

interface FeedbackAlertProps {
  severity?: "error" | "success" | "warning" | "info";
  title?: string;
  children: ReactNode;
  onClose?: () => void;
}

const iconMap = {
  error: <ErrorRounded />,
  success: <CheckCircleRounded />,
  warning: <WarningAmberRounded />,
  info: <InfoRounded />,
};

const styles = {
  error: {
    background:
      "linear-gradient(135deg, rgba(254,242,242,0.98), rgba(255,247,247,0.98))",
    border: "1px solid rgba(239,68,68,0.18)",
    iconBackground: "rgba(239,68,68,0.11)",
    iconColor: "#DC2626",
    titleColor: "#991B1B",
  },
  success: {
    background:
      "linear-gradient(135deg, rgba(240,253,244,0.98), rgba(247,254,249,0.98))",
    border: "1px solid rgba(34,197,94,0.2)",
    iconBackground: "rgba(34,197,94,0.11)",
    iconColor: "#16A34A",
    titleColor: "#166534",
  },
  warning: {
    background:
      "linear-gradient(135deg, rgba(255,251,235,0.98), rgba(255,253,245,0.98))",
    border: "1px solid rgba(245,158,11,0.22)",
    iconBackground: "rgba(245,158,11,0.12)",
    iconColor: "#D97706",
    titleColor: "#92400E",
  },
  info: {
    background:
      "linear-gradient(135deg, rgba(239,246,255,0.98), rgba(246,249,255,0.98))",
    border: "1px solid rgba(37,99,235,0.18)",
    iconBackground: "rgba(37,99,235,0.1)",
    iconColor: "#2563EB",
    titleColor: "#1E3A8A",
  },
};

export default function FeedbackAlert({
  severity = "info",
  title,
  children,
  onClose,
}: FeedbackAlertProps) {
  const currentStyle = styles[severity];

  return (
    <Alert
      severity={severity}
      icon={false}
      onClose={onClose}
      sx={{
        alignItems: "flex-start",
        borderRadius: 3.5,
        background: currentStyle.background,
        border: currentStyle.border,
        boxShadow: "0 10px 28px rgba(15,23,42,0.05)",
        px: 2,
        py: 1.5,

        "& .MuiAlert-message": {
          width: "100%",
          p: 0,
        },

        "& .MuiAlert-action": {
          pt: 0.25,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.4,
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            borderRadius: 2.5,
            backgroundColor: currentStyle.iconBackground,
            color: currentStyle.iconColor,

            "& svg": {
              fontSize: 22,
            },
          }}
        >
          {iconMap[severity]}
        </Box>

        <Box sx={{ pt: 0.15 }}>
          {title && (
            <Typography
              sx={{
                fontWeight: 750,
                color: currentStyle.titleColor,
                lineHeight: 1.3,
              }}
            >
              {title}
            </Typography>
          )}

          <Typography
            sx={{
              mt: title ? 0.35 : 0,
              color: "#526078",
              fontSize: "0.91rem",
              lineHeight: 1.55,
            }}
          >
            {children}
          </Typography>
        </Box>
      </Box>
    </Alert>
  );
}