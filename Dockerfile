# Use a base image with Node.js for building the React app
FROM node:22 AS build-stage

# Set the working directory
WORKDIR /app/frontend

# Copy frontend package files and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the rest of the frontend code and build it
COPY frontend ./
RUN npm run build

# Use a clean base Python image for the final image
FROM python:3.11-slim AS production-stage

# Set the working directory to the location of app.py
WORKDIR /app/backend

# Copy backend requirements and install them
COPY backend/requirements.txt ../
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install --upgrade setuptools
RUN python3 -m pip install --no-cache-dir -v -r ../requirements.txt

# Copy the Flask backend code
COPY backend/ .

# Copy the built React files into the location expected by Flask
COPY --from=build-stage /app/frontend/dist ../frontend/dist

# Expose the port that Flask will use
EXPOSE 5000

# Start Flask
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
