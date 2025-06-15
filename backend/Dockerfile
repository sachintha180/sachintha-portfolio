# Use a clean base Python image for the final image
FROM python:3.11-slim AS production-stage

# Set the working directory to the location of app.py
WORKDIR /app/backend

# Copy backend requirements and install them
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask backend code
COPY . .

# Use gunicorn to serve Flask in production
CMD ["gunicorn", "-b", "0.0.0.0:80", "app:app"]

# Expose port 80 (default) for public access
EXPOSE 80