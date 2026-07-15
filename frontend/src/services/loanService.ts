import axios from "../api/axios";
import type {
  LoanApplicationRequest,
  LoanApplicationResponse,
} from "../types/loan";

export async function createLoanApplication(
  request: LoanApplicationRequest
): Promise<LoanApplicationResponse> {


  const response =
    await axios.post<LoanApplicationResponse>(
      "/LoanApplications",
      request
    );

  return response.data;
}