FROM node:18-alpine AS client-builder

WORKDIR /app/client
COPY client/package.json client/package-lock.json* ./
RUN npm install
COPY client/ .
RUN npm run build

FROM node:18-alpine AS server-builder

WORKDIR /app/server
COPY server/package.json server/package-lock.json* ./ 
RUN npm install
COPY server/ .
COPY --from=client-builder /app/client/dist ./public 
RUN npm run build

FROM node:18-alpine

WORKDIR /app/server

COPY --from=server-builder /app/server/dist ./dist
COPY --from=server-builder /app/server/package.json ./package.json
COPY --from=server-builder /app/server/package-lock.json ./package-lock.json
COPY --from=server-builder /app/server/public ./public

# Install only production dependencies
RUN npm install --production

EXPOSE 5000
CMD ["npm", "start"]
