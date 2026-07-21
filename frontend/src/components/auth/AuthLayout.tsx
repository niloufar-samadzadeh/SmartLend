import type { ReactNode } from "react";
import {
    AutoAwesomeRounded,
    InsightsRounded,
    SecurityRounded,
    SpeedRounded,
    TaskAltRounded,
    TrendingUpRounded,
} from "@mui/icons-material";
import {
    Box,
    Chip,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import SmartLendLogo from "../SmartLendLogo";

interface AuthLayoutProps {
    children: ReactNode;
}

const features = [
    {
        icon: <SpeedRounded />,
        title: "Instant Risk Analysis",
        description:
            "Evaluate loan applications in seconds using intelligent scoring.",
    },
    {
        icon: <SecurityRounded />,
        title: "Secure & Reliable",
        description:
            "A protected workflow designed for modern lending operations.",
    },
    {
        icon: <InsightsRounded />,
        title: "Data-Driven Decisions",
        description:
            "Turn financial information into clear and actionable insights.",
    },
];

export default function AuthLayout({
    children,
}: AuthLayoutProps) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                position: "relative",
                overflow: "hidden",
                background:
                    "linear-gradient(135deg, #F8FAFF 0%, #EEF4FF 52%, #F7F3FF 100%)",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: 520,
                    height: 520,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(99,102,241,0.17) 0%, rgba(99,102,241,0) 70%)",
                    top: -190,
                    right: -120,
                    pointerEvents: "none",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    width: 420,
                    height: 420,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(6,182,212,0.16) 0%, rgba(6,182,212,0) 70%)",
                    bottom: -180,
                    left: -100,
                    pointerEvents: "none",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.38,
                    pointerEvents: "none",
                    backgroundImage:
                        "radial-gradient(rgba(37,99,235,0.18) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                    maskImage:
                        "linear-gradient(to right, black 0%, transparent 58%)",
                }}
            />

            <Container
                maxWidth={false}
                sx={{
                    minHeight: "100vh",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "minmax(0, 1.12fr) minmax(430px, 0.88fr)",
                    },
                    px: {
                        xs: 2,
                        sm: 4,
                        lg: 7,
                        xl: 10,
                    },
                    py: {
                        xs: 2.5,
                        lg: 3,
                    },
                    gap: {
                        xs: 4,
                        lg: 7,
                    },
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Box
                    sx={{
                        display: {
                            xs: "none",
                            lg: "block",
                        },
                        maxWidth: 760,
                    }}
                >
                    <SmartLendLogo />

                    <Chip
                        icon={<AutoAwesomeRounded />}
                        label="Intelligent lending, simplified"
                        sx={{
                            mt: 4.5,
                            height: 38,
                            px: 1,
                            borderRadius: 3,
                            color: "#4338CA",
                            backgroundColor: "rgba(99,102,241,0.09)",
                            border: "1px solid rgba(99,102,241,0.14)",
                            "& .MuiChip-icon": {
                                color: "#6366F1",
                            },
                        }}
                    />

                    <Typography
                        component="h1"
                        sx={{
                            mt: 3,
                            maxWidth: 650,
                            fontSize: {
                                lg: "3.7rem",
                                xl: "4.4rem",
                            },
                            fontWeight: 850,
                            lineHeight: 1.04,
                            letterSpacing: "-0.06em",
                            color: "#0B163F",
                        }}
                    >
                        Smarter lending decisions{" "}
                        <Box
                            component="span"
                            sx={{
                                background:
                                    "linear-gradient(110deg, #2563EB 10%, #7C3AED 60%, #06B6D4 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            powered by AI
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            mt: 3,
                            maxWidth: 600,
                            color: "#53627C",
                            fontSize: "1.08rem",
                            lineHeight: 1.85,
                        }}
                    >
                        SmartLend combines automated risk assessment,
                        secure application management and clear financial
                        insights in one modern platform.
                    </Typography>

                    <Stack spacing={2.2} sx={{ mt: 4.5 }}>
                        {features.map((feature) => (
                            <Box
                                key={feature.title}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    maxWidth: 580,
                                    p: 1.2,
                                    borderRadius: 4,
                                    transition:
                                        "transform 180ms ease, background-color 180ms ease",
                                    "&:hover": {
                                        transform: "translateX(7px)",
                                        backgroundColor: "rgba(255,255,255,0.54)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        display: "grid",
                                        placeItems: "center",
                                        flexShrink: 0,
                                        borderRadius: 3.5,
                                        color: "#4F46E5",
                                        background:
                                            "linear-gradient(135deg, rgba(37,99,235,0.11), rgba(124,58,237,0.11))",
                                        border:
                                            "1px solid rgba(99,102,241,0.12)",
                                    }}
                                >
                                    {feature.icon}
                                </Box>

                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 750,
                                            color: "#122045",
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#6A7891",
                                            fontSize: "0.91rem",
                                            mt: 0.25,
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Stack>

                    <Box
                        sx={{
                            mt: 3.5,
                            position: "relative",
                            maxWidth: 630,
                            height: 165,
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                left: 45,
                                top: 20,
                                width: 245,
                                p: 2.5,
                                borderRadius: 5,
                                backgroundColor: "rgba(255,255,255,0.74)",
                                border: "1px solid rgba(255,255,255,0.92)",
                                backdropFilter: "blur(18px)",
                                boxShadow:
                                    "0 22px 55px rgba(41,65,120,0.14)",
                                transform: "rotate(-3deg)",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box>
                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: "0.78rem",
                                        }}
                                    >
                                        Risk score
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: 850,
                                            fontSize: "2rem",
                                            color: "#16A34A",
                                            mt: 0.5,
                                        }}
                                    >
                                        92%
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: 46,
                                        height: 46,
                                        borderRadius: 3,
                                        display: "grid",
                                        placeItems: "center",
                                        color: "#16A34A",
                                        backgroundColor: "rgba(34,197,94,0.1)",
                                    }}
                                >
                                    <TaskAltRounded />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    height: 7,
                                    borderRadius: 99,
                                    backgroundColor: "#E2E8F0",
                                    mt: 2,
                                    overflow: "hidden",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: "100%",
                                        width: "92%",
                                        borderRadius: 99,
                                        background:
                                            "linear-gradient(90deg, #22C55E, #06B6D4)",
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                position: "absolute",
                                left: 255,
                                top: 67,
                                width: 230,
                                p: 2.5,
                                borderRadius: 5,
                                backgroundColor: "rgba(255,255,255,0.8)",
                                border: "1px solid rgba(255,255,255,0.94)",
                                backdropFilter: "blur(18px)",
                                boxShadow:
                                    "0 22px 55px rgba(41,65,120,0.14)",
                                transform: "rotate(3deg)",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.4,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        display: "grid",
                                        placeItems: "center",
                                        borderRadius: 3,
                                        color: "#6D28D9",
                                        backgroundColor: "rgba(124,58,237,0.1)",
                                    }}
                                >
                                    <TrendingUpRounded />
                                </Box>

                                <Box>
                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: "0.78rem",
                                        }}
                                    >
                                        AI assessment
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: "1.25rem",
                                        }}
                                    >
                                        1.8 seconds
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 540,
                        justifySelf: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: {
                                xs: "block",
                                lg: "none",
                            },
                            mb: 4,
                        }}
                    >
                        <SmartLendLogo />
                    </Box>

                    {children}
                </Box>
            </Container>
        </Box>
    );
}