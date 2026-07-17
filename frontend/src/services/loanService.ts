import axios from "../api/axios";
import type {
  LoanApplication,
  LoanApplicationRequest,
  LoanApplicationResponse,
} from "../types/loan";

export async function createLoanApplication(
    request: LoanApplicationRequest
): Promise<LoanApplicationResponse> {
    const response = await axios.post<LoanApplicationResponse>(
        "/LoanApplications",
        request
    );

    return response.data;
}

export async function getMyApplications() {
    const response = await axios.get("/LoanApplications/mine");
    return response.data;
}
export async function getAllApplications(): Promise<LoanApplication[]> {
    const response = await axios.get<LoanApplication[]>("/LoanApplications");
    return response.data;
}

export async function updateLoanDecision(
    id: number,
    status: 2 | 3
): Promise<void> {
    await axios.patch(`/LoanApplications/${id}/decision`, {
        status,
    });
}