import path from "path";

/*
 * This file is responsible for loading environment variables from the .env file
 */

require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });
// require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const getEnvVariable = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    console.error(`Environment variable ${key} is required`);
    process.exit(1);
  }

  return value;
};

const getOptionalEnvVariable = (key: string): string | undefined => {
  const value = process.env[key];

  if (!value) {
    console.warn(
      `Environment variable ${key} is not set but retrieved optionally.`
    );
  }

  return value;
};

export const appEnv = {
  app: {
    domain: getEnvVariable("APP_DOMAIN"),
    name: getEnvVariable("APP_NAME"),
    version: getEnvVariable("APP_VERSION"),
  },
  server: {
    baseRouterUrl: getEnvVariable("BASE_ROUTER_URL"),
    port: getOptionalEnvVariable("PORT") || 3000,
    env: getOptionalEnvVariable("NODE_ENV") || "development",
  },
  cookies: {
    maxAge: getEnvVariable("COOKIES_MAX_AGE"),
  },
  cors: {
    origin: getEnvVariable("CORS_ORIGIN"),
  },
  logs: {
    console_logs: getOptionalEnvVariable("LOG_CONSOLE") == "true",
    logs_path: getEnvVariable("LOGS_PATH"),
  },
};
