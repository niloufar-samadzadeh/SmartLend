export interface LoanApplicationRequest {
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
  status: string;
  riskScore: number | null;
}

export interface LoanApplication {
  id: number;
  monthlyIncome: number;
  loanAmount: number;
  status: string;
  riskScore: number | null;
  submittedAt: string;
}