import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography,
} from "@mui/material";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const handleLogin = async () => {
        try {
            const result = await login({
                email,
                password,
            });

            auth.login(result.token);

            navigate("/dashboard");
        } catch {
            alert("Invalid email or password.");
        }
    };
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
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

                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            fullWidth
                            margin="normal"
                        />

                        <Button
                            variant="contained"
                            onClick={handleLogin}
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Sign In
                        </Button>

                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}