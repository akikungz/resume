# Step 1: Base image for building the application
FROM node:20-alpine AS base

# Install corepack and enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy lockfile and package.json to fetch dependencies
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

# Install dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the Next.js application (generates the static 'out' folder)
RUN pnpm build

# Step 2: Production runner stage using Nginx to serve static files
FROM nginx:alpine AS runner

# Copy built static files to Nginx public folder
COPY --from=base /app/out /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
