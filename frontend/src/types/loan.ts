export interface LoanApplicationRequest {
  userId: number;
  monthlyIncome: number;
  employmentStatus: string;
  employmentYears: number;
  loanAmount: number;
  loanPurpose: string;
  existingDebt: number;
  creditHistoryMonths: number;
}

export interface LoanApplicationResponse {
  id: number;
  status: number;
  riskScore: number | null;
}