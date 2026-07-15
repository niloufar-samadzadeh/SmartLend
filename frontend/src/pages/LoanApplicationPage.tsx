import { useNavigate } from "react-router-dom";
import { createLoanApplication } from "../services/loanService";
import { useState } from "react";
import {
    Box,
    Button,
    Container,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

export default function LoanApplicationPage() {
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [employmentStatus, setEmploymentStatus] = useState("Full-time");
    const [employmentYears, setEmploymentYears] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [loanPurpose, setLoanPurpose] = useState("");
    const [existingDebt, setExistingDebt] = useState("");
    const [creditHistoryMonths, setCreditHistoryMonths] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const result = await createLoanApplication({
                userId: 1,
                monthlyIncome: Number(monthlyIncome),
                employmentStatus,
                employmentYears: Number(employmentYears),
                loanAmount: Number(loanAmount),
                loanPurpose,
                existingDebt: Number(existingDebt),
                creditHistoryMonths: Number(creditHistoryMonths),
            });

            alert(
                `Application submitted!\nRisk Score: ${result.riskScore}\nStatus: ${result.status}`
            );

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Failed to submit application.");
        }
    };
    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700 }}
                >
                    New Loan Application
                </Typography>

                <Typography
                    sx={{
                        color: "text.secondary",
                        mt: 1,
                    }}
                >
                    Complete the form to receive an automated risk assessment.
                </Typography>
                <Stack spacing={3} sx={{ mt: 4 }}>

                    <TextField
                        label="Monthly Income"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(e.target.value)}
                    />

                    <TextField
                        select
                        label="Employment Status"
                        value={employmentStatus}
                        onChange={(e) => setEmploymentStatus(e.target.value)}
                    >
                        <MenuItem value="Full-time">Full-time</MenuItem>
                        <MenuItem value="Part-time">Part-time</MenuItem>
                        <MenuItem value="Self-employed">Self-employed</MenuItem>
                        <MenuItem value="Unemployed">Unemployed</MenuItem>
                    </TextField>

                    <TextField
                        label="Years of Employment"
                        value={employmentYears}
                        onChange={(e) => setEmploymentYears(e.target.value)}
                    />

                    <TextField
                        label="Loan Amount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                    />

                    <TextField
                        label="Loan Purpose"
                        value={loanPurpose}
                        onChange={(e) => setLoanPurpose(e.target.value)}
                    />

                    <TextField
                        label="Existing Debt"
                        value={existingDebt}
                        onChange={(e) => setExistingDebt(e.target.value)}
                    />

                    <TextField
                        label="Credit History (Months)"
                        value={creditHistoryMonths}
                        onChange={(e) => setCreditHistoryMonths(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                    >
                        Submit Application
                    </Button>

                </Stack>
            </Box>
        </Container>
    );
}