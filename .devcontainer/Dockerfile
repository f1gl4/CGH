FROM mcr.microsoft.com/devcontainers/java:1-21-bullseye

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && npm -v && node -v
