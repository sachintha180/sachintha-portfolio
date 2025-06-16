# PowerShell script to build Docker images for frontend and backend

# Define image names
$frontendImage = "frontend-image"
$backendImage = "backend-image"

# Build frontend Docker image
Write-Host "Building frontend Docker image..."
Set-Location -Path "./frontend"
docker build -t $frontendImage .

# Navigate back to the project root
Set-Location -Path ".."

# Build backend Docker image
Write-Host "Building backend Docker image..."
Set-Location -Path "./backend"
docker build -t $backendImage .

# Navigate back to the project root
Set-Location -Path ".."

Write-Host "Docker images for frontend and backend built successfully."