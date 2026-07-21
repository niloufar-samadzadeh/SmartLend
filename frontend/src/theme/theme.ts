import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#2563EB",
            light: "#60A5FA",
            dark: "#1D4ED8",
            contrastText: "#FFFFFF",
        },

        secondary: {
            main: "#06B6D4",
            light: "#67E8F9",
            dark: "#0891B2",
            contrastText: "#FFFFFF",
        },

        success: {
            main: "#16A34A",
        },

        warning: {
            main: "#F59E0B",
        },

        error: {
            main: "#DC2626",
        },

        background: {
            default: "#F5F7FB",
            paper: "#FFFFFF",
        },

        text: {
            primary: "#0F172A",
            secondary: "#64748B",
        },

        divider: "#E2E8F0",
    },

    typography: {
        fontFamily: [
            "Inter",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "sans-serif",
        ].join(","),

        h1: {
            fontWeight: 800,
            letterSpacing: "-0.04em",
        },

        h2: {
            fontWeight: 800,
            letterSpacing: "-0.035em",
        },

        h3: {
            fontWeight: 750,
            letterSpacing: "-0.03em",
        },

        h4: {
            fontWeight: 750,
            letterSpacing: "-0.025em",
        },

        h5: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
        },

        h6: {
            fontWeight: 700,
        },

        button: {
            fontWeight: 700,
            textTransform: "none",
            letterSpacing: 0,
        },

        body1: {
            lineHeight: 1.7,
        },

        body2: {
            lineHeight: 1.6,
        },
    },

    shape: {
        borderRadius: 14,
    },

    shadows: [
        "none",
        "0 1px 2px rgba(15, 23, 42, 0.04)",
        "0 2px 6px rgba(15, 23, 42, 0.05)",
        "0 4px 12px rgba(15, 23, 42, 0.06)",
        "0 8px 20px rgba(15, 23, 42, 0.07)",
        "0 12px 28px rgba(15, 23, 42, 0.08)",
        "0 16px 36px rgba(15, 23, 42, 0.09)",
        "0 20px 45px rgba(15, 23, 42, 0.1)",
        "0 24px 52px rgba(15, 23, 42, 0.11)",
        "0 28px 60px rgba(15, 23, 42, 0.12)",
        "0 32px 68px rgba(15, 23, 42, 0.13)",
        "0 36px 76px rgba(15, 23, 42, 0.14)",
        "0 40px 84px rgba(15, 23, 42, 0.15)",
        "0 44px 92px rgba(15, 23, 42, 0.16)",
        "0 48px 100px rgba(15, 23, 42, 0.17)",
        "0 52px 108px rgba(15, 23, 42, 0.18)",
        "0 56px 116px rgba(15, 23, 42, 0.19)",
        "0 60px 124px rgba(15, 23, 42, 0.2)",
        "0 64px 132px rgba(15, 23, 42, 0.21)",
        "0 68px 140px rgba(15, 23, 42, 0.22)",
        "0 72px 148px rgba(15, 23, 42, 0.23)",
        "0 76px 156px rgba(15, 23, 42, 0.24)",
        "0 80px 164px rgba(15, 23, 42, 0.25)",
        "0 84px 172px rgba(15, 23, 42, 0.26)",
        "0 88px 180px rgba(15, 23, 42, 0.27)",
    ],

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#F5F7FB",
                },

                "::selection": {
                    backgroundColor: alpha("#2563EB", 0.18),
                },

                "*": {
                    boxSizing: "border-box",
                },

                a: {
                    color: "#2563EB",
                    textDecoration: "none",
                    fontWeight: 650,
                },

                "a:hover": {
                    color: "#1D4ED8",
                },
            },
        },

        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },

            styleOverrides: {
                root: {
                    minHeight: 48,
                    borderRadius: 12,
                    paddingLeft: 22,
                    paddingRight: 22,
                    transition:
                        "transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease",

                    "&.MuiButton-containedPrimary": {
                        background:
                            "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                        boxShadow:
                            "0 10px 24px rgba(37, 99, 235, 0.24)",

                        "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow:
                                "0 14px 30px rgba(37, 99, 235, 0.32)",
                        },

                        "&:active": {
                            transform: "translateY(0)",
                        },
                    },
                },

                outlined: {
                    borderWidth: 1.5,

                    "&:hover": {
                        borderWidth: 1.5,
                    },
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    minHeight: 54,
                    borderRadius: 12,
                    backgroundColor: "#FFFFFF",
                    transition:
                        "box-shadow 160ms ease, background-color 160ms ease",

                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#CBD5E1",
                    },

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#94A3B8",
                    },

                    "&.Mui-focused": {
                        boxShadow: `0 0 0 4px ${alpha("#2563EB", 0.12)}`,
                    },

                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2563EB",
                        borderWidth: 1.5,
                    },
                },
            },
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "#64748B",

                    "&.Mui-focused": {
                        color: "#2563EB",
                    },
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    border: "1px solid rgba(226, 232, 240, 0.85)",
                    boxShadow: "0 20px 55px rgba(15, 23, 42, 0.08)",
                    backgroundImage: "none",
                },
            },
        },

        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: 32,

                    "&:last-child": {
                        paddingBottom: 32,
                    },
                },
            },
        },

        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    alignItems: "center",
                },
            },
        },

        MuiCircularProgress: {
            defaultProps: {
                thickness: 5,
            },
        },
    },
});

export default theme;