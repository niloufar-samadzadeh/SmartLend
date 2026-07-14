using System.Net.Http.Json;
using System.Text.Json.Serialization;

namespace SmartLend.Api.Clients;

public class RiskScoringClient
{
    private readonly HttpClient _httpClient;

    public RiskScoringClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<RiskResponse?> PredictAsync(RiskRequest request)
    {
        var response = await _httpClient.PostAsJsonAsync(
            "/predict",
            request);

        response.EnsureSuccessStatusCode();

        return await response.Content.ReadFromJsonAsync<RiskResponse>();
    }
}

public class RiskRequest
{
    [JsonPropertyName("monthly_income")]
    public decimal MonthlyIncome { get; set; }

    [JsonPropertyName("employment_years")]
    public int EmploymentYears { get; set; }

    [JsonPropertyName("loan_amount")]
    public decimal LoanAmount { get; set; }

    [JsonPropertyName("existing_debt")]
    public decimal ExistingDebt { get; set; }

    [JsonPropertyName("credit_history_months")]
    public int CreditHistoryMonths { get; set; }
}

public class RiskResponse
{
    [JsonPropertyName("risk_score")]
    public decimal RiskScore { get; set; }

    [JsonPropertyName("risk_band")]
    public string RiskBand { get; set; } = string.Empty;
}