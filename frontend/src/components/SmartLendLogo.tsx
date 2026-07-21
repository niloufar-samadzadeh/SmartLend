import { Box, Typography } from "@mui/material";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";

interface SmartLendLogoProps {
  light?: boolean;
  compact?: boolean;
}

export default function SmartLendLogo({
  light = false,
  compact = false,
}: SmartLendLogoProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.4,
      }}
    >
      <Box
        sx={{
          width: compact ? 42 : 48,
          height: compact ? 42 : 48,
          display: "grid",
          placeItems: "center",
          borderRadius: "15px",
          color: "#FFFFFF",
          background:
            "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
          boxShadow:
            "0 12px 30px rgba(37, 99, 235, 0.28)",
          transform: "rotate(-4deg)",
        }}
      >
        <AutoGraphRoundedIcon
          sx={{
            fontSize: compact ? 25 : 29,
            transform: "rotate(4deg)",
          }}
        />
      </Box>

      <Box>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: compact ? "1.25rem" : "1.55rem",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: light ? "#FFFFFF" : "#0F172A",
          }}
        >
          SmartLend
        </Typography>

        {!compact && (
          <Typography
            sx={{
              mt: 0.4,
              fontSize: "0.78rem",
              color: light
                ? "rgba(255,255,255,0.68)"
                : "text.secondary",
            }}
          >
            AI-Powered Lending Intelligence
          </Typography>
        )}
      </Box>
    </Box>
  );
}