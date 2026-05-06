FROM node:20-alpine AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,target=/pnpm/.pnpm-store pnpm install --frozen-lockfile

COPY ./ ./

EXPOSE 4200
CMD ["pnpm", "nx", "run", "pokemon-ui:serve", "--host", "0.0.0.0", "--port", "4200"]
