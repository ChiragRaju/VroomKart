A full-stack Automobile E-Commerce web application built using .NET 9, Angular 20, SQL Server, SignalR, and Redis Cache.
This project demonstrates enterprise-level architecture with scalable backend services, responsive UI, real-time updates, and caching for performance optimization.


# 1️⃣ Create a solution
dotnet new sln -n Automobile

# 2️⃣ Create the API project
dotnet new webapi -n Automobile.Api

# 3️⃣ Create the Core library (Domain + Application layer)
dotnet new classlib -n Automobile.Core

# 4️⃣ Create the Infrastructure library (Data access, EF Core, Repos)
dotnet new classlib -n Automobile.Infrastructure

# 5️⃣ Add projects to solution
dotnet sln Automobile.sln add Automobile.Api/Automobile.Api.csproj
dotnet sln Automobile.sln add Automobile.Core/Automobile.Core.csproj
dotnet sln Automobile.sln add Automobile.Infrastructure/Automobile.Infrastructure.csproj

# 6️⃣ Add references
# API depends on Core + Infrastructure
dotnet add Automobile.Api/Automobile.Api.csproj reference Automobile.Core/Automobile.Core.csproj
dotnet add Automobile.Api/Automobile.Api.csproj reference Automobile.Infrastructure/Automobile.Infrastructure.csproj

# Infrastructure depends on Core
dotnet add Automobile.Infrastructure/Automobile.Infrastructure.csproj reference Automobile.Core/Automobile.Core.csproj


Automobile/
│── Automobile.sln
│── Automobile.Api/              # Web API project
│── Automobile.Core/             # Domain & Business logic
│── Automobile.Infrastructure/   # EF Core, Repos, DB Context


# Go into your API project folder
cd Automobile.Api

# Run with hot reload
dotnet watch run

