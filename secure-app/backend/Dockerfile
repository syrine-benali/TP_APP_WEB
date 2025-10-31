# --- Étape 1 : Build TypeScript ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
COPY db ./db

# --- Étape 2 : Exécution en production avec tsx ---
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package*.json ./
COPY --from=build /app/src ./src
COPY --from=build /app/db ./db
RUN npm ci
EXPOSE 4000
CMD ["npx", "tsx", "src/server.ts"]