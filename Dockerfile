# Build stage
FROM node:23.7-alpine AS builder

# Enable corepack for pnpm
RUN corepack enable pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies with optimizations
RUN pnpm config set store-dir /tmp/.pnpm-store && \
    pnpm install --frozen-lockfile --prefer-offline

# Copy source code
COPY . .

# Generate Prisma client and build in a single layer
RUN pnpm exec prisma generate && \
    pnpm run build

# Production stage
FROM node:23.7-alpine AS production

# Enable corepack for pnpm
RUN corepack enable pnpm

# Set working directory
WORKDIR /app

# Copy package files and prisma schema
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# Install only production dependencies and generate Prisma client
RUN pnpm config set store-dir /tmp/.pnpm-store && \
    pnpm install --frozen-lockfile --prefer-offline --prod --ignore-scripts && \
    pnpm exec prisma generate

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Run database migrations and start the application
CMD ["node", "dist/src/main.js"]
