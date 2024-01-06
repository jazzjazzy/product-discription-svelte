FROM node:lts-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --production


FROM node:lts-slim
USER node:node
WORKDIR /app
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json .

USER root
RUN apt-get update && apt-get install -y openssl

ENV PORT 8080
EXPOSE 8080
EXPOSE 24678

# This command "tails" a system device, effectively doing nothing, but it keeps the container up and running
# we do this so we can start `npm run dev` from the terminal and see console.log outputs
# use `docker exec -it sveltekit npm run dev` to start the dev server
CMD ["tail", "-f", "/dev/null"]
