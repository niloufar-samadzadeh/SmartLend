FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY SmartLend.Api/SmartLend.Api.csproj SmartLend.Api/
COPY SmartLend.Core/SmartLend.Core.csproj SmartLend.Core/
COPY SmartLend.Infrastructure/SmartLend.Infrastructure.csproj SmartLend.Infrastructure/

RUN dotnet restore SmartLend.Api/SmartLend.Api.csproj

COPY . .

RUN dotnet publish SmartLend.Api/SmartLend.Api.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime

WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080

EXPOSE 8080

ENTRYPOINT ["dotnet", "SmartLend.Api.dll"]