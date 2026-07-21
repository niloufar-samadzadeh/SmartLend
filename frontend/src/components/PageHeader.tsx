import type { ReactNode } from "react";
import { AutoAwesomeRounded } from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: {
          xs: "stretch",
          md: "center",
        },
        justifyContent: "space-between",
        gap: 2.5,
        mb: 4,
      }}
    >
      <Box>
        {eyebrow && (
          <Chip
            icon={<AutoAwesomeRounded />}
            label={eyebrow}
            size="small"
            sx={{
              mb: 1.6,
              color: "#4338CA",
              backgroundColor: "rgba(99,102,241,0.09)",
              border: "1px solid rgba(99,102,241,0.12)",

              "& .MuiChip-icon": {
                color: "#6366F1",
              },
            }}
          />
        )}

        <Typography
          variant="h3"
          sx={{
            fontSize: {
              xs: "2rem",
              md: "2.65rem",
            },
            color: "#0B163F",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            maxWidth: 680,
            color: "text.secondary",
            fontSize: "1rem",
          }}
        >
          {description}
        </Typography>
      </Box>

      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Box>
  );
}