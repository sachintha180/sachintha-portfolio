# Stage 1: Build Phase
FROM node:22 as build-stage

# Set the working directory to the location of index.html
WORKDIR /app/frontend

# Copy frontend requirements and install them
COPY package.json package-lock.json ./
RUN npm install

# Copy the React frontend code
COPY . .

# Run the build process
RUN npm run build

# Stage 2: Serve Phase
FROM nginx:alpine

# Copy the build into nginx for 
COPY --from=build-stage /app/frontend/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (default) for public access
EXPOSE 80