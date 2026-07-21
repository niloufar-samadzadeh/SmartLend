using System.Net;
using System.Text.Json;

namespace SmartLend.Api.Middleware;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;
    private readonly IWebHostEnvironment _environment;

    public GlobalExceptionMiddleware(
        RequestDelegate next,
        ILogger<GlobalExceptionMiddleware> logger,
        IWebHostEnvironment environment)
    {
        _next = next;
        _logger = logger;
        _environment = environment;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (KeyNotFoundException exception)
        {
            await WriteErrorResponseAsync(
                context,
                HttpStatusCode.NotFound,
                exception.Message);
        }
        catch (ArgumentException exception)
        {
            await WriteErrorResponseAsync(
                context,
                HttpStatusCode.BadRequest,
                exception.Message);
        }
        catch (InvalidOperationException exception)
        {
            await WriteErrorResponseAsync(
                context,
                HttpStatusCode.BadRequest,
                exception.Message);
        }
        catch (HttpRequestException exception)
        {
            _logger.LogError(
                exception,
                "An external service request failed.");

            await WriteErrorResponseAsync(
                context,
                HttpStatusCode.BadGateway,
                "An external service is currently unavailable.");
        }
        catch (Exception exception)
        {
            _logger.LogError(
                exception,
                "An unexpected error occurred while processing the request.");

            var message = _environment.IsDevelopment()
                ? exception.Message
                : "An unexpected server error occurred.";

            await WriteErrorResponseAsync(
                context,
                HttpStatusCode.InternalServerError,
                message);
        }
    }

    private static async Task WriteErrorResponseAsync(
        HttpContext context,
        HttpStatusCode statusCode,
        string message)
    {
        if (context.Response.HasStarted)
        {
            return;
        }

        context.Response.Clear();
        context.Response.StatusCode = (int)statusCode;
        context.Response.ContentType = "application/json";

        var response = new
        {
            message
        };

        var json = JsonSerializer.Serialize(response);

        await context.Response.WriteAsync(json);
    }
}