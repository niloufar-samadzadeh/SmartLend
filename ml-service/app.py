from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="SmartLend ML Risk Service")


class RiskRequest(BaseModel):
    monthly_income: float
    employment_years: int
    loan_amount: float
    existing_debt: float
    credit_history_months: int


class RiskResponse(BaseModel):
    risk_score: float
    risk_band: str


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/predict", response_model=RiskResponse)
def predict_risk(request: RiskRequest):
    debt_ratio = request.existing_debt / max(request.monthly_income, 1)
    loan_ratio = request.loan_amount / max(request.monthly_income * 12, 1)

    score = min(
        1.0,
        (debt_ratio * 0.4)
        + (loan_ratio * 0.4)
        + (0.1 if request.employment_years < 2 else 0)
        + (0.1 if request.credit_history_months < 24 else 0),
    )

    if score < 0.35:
        risk_band = "Low"
    elif score < 0.65:
        risk_band = "Medium"
    else:
        risk_band = "High"

    return RiskResponse(
        risk_score=round(score, 4),
        risk_band=risk_band,
    )