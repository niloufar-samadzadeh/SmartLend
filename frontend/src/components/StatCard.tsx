import type { ReactNode } from "react";
import { ArrowUpwardRounded } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  accent: string;
  softAccent: string;
  helper?: string;
}

export default function StatCard({
  label,
  value,
  icon,
  accent,
  softAccent,
  helper,
}: StatCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
        transition:
          "transform 180ms ease, box-shadow 180ms ease",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 24px 60px rgba(15,23,42,0.11)",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 120,
          height: 120,
          right: -45,
          top: -45,
          borderRadius: "50%",
          backgroundColor: softAccent,
        },
      }}
    >
      <CardContent
        sx={{
          position: "relative",
          zIndex: 1,
          p: 2.7,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              display: "grid",
              placeItems: "center",
              borderRadius: 3.2,
              color: accent,
              backgroundColor: softAccent,

              "& svg": {
                fontSize: 25,
              },
            }}
          >
            {icon}
          </Box>

          {helper && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.3,
                color: "#16A34A",
                fontSize: "0.76rem",
                fontWeight: 700,
              }}
            >
              <ArrowUpwardRounded sx={{ fontSize: 15 }} />
              {helper}
            </Box>
          )}
        </Box>

        <Typography
          variant="h3"
          sx={{
            mt: 2.4,
            fontSize: "2.1rem",
            color: "#0F172A",
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            mt: 0.6,
            color: "text.secondary",
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
}