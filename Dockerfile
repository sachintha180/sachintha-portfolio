# Use a base image with Node.js for building the React app
FROM node:16 as build-stage

# Set the working directory
WORKDIR /app/frontend

# Copy frontend package files and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the rest of the frontend code and build it
COPY frontend ./
RUN npm run build

# Use a clean base Python image for the final image
FROM python:3.11-slim as production-stage

# Reset the working directory
WORKDIR /app

# Copy backend requirements and install them
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask backend code
COPY backend /app/backend

# Expose the port that Flask will use
EXPOSE 5000

# Start Flask
CMD ["flask", "run"]