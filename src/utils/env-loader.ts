import { VarEnvValidationError } from "../errors/var-env-validation.error";
import { EnvVarType, validateEnvVariable } from "./validate-env-variable";

/*
 * This file is responsible for loading and validating environment variables from the .env file.
 * It must not use the logger as the logger uses the environment variables. (circular dependency)
 */

require("dotenv").config();

const getEnvVariable = <T>(key: string, type: EnvVarType): T => {
  const value = process.env[key];

  if (!value) {
    console.error(`Environment variable ${key} is required`);
    process.exit(1);
  }

  let validated;
  try {
    validated = validateEnvVariable<T>(value, type, key);
  } catch (error) {
    if (error instanceof VarEnvValidationError) {
      console.error(
        `Error validating environment variable ${key}: ${error.toLogObject()}`
      );
      process.exit(1);
    }
  }

  if (!validated) {
    console.error(`Error validating environment variable ${key}`);
    process.exit(1);
  }

  return validated;
};

const getOptionalEnvVariable = <T>(
  key: string,
  type: EnvVarType
): T | undefined => {
  const value = process.env[key];

  if (!value) {
    console.warn(
      `Environment variable ${key} is not set but retrieved optionally.`
    );
    return undefined;
  }

  let validated;
  try {
    validated = validateEnvVariable<T>(value, type, key);
  } catch (error) {
    if (error instanceof VarEnvValidationError) {
      console.error(
        `Error validating environment variable ${key}: ${error.message}`
      );
      process.exit(1);
    }
  }

  if (!validated) {
    console.warn(`Error validating environment variable ${key}`);
  }

  return validated;
};

export const appEnv = {
  app: {
    name: getEnvVariable<string>("APP_NAME", "string"),
    version: getEnvVariable<string>("APP_VERSION", "string"),
  },
  server: {
    baseRouterUrl: getEnvVariable<string>("BASE_ROUTER_URL", "string"),
    port: getOptionalEnvVariable<Number>("PORT", "number") || 3000,
    env: getOptionalEnvVariable<string>("NODE_ENV", "string") || "development",
  },
  cookies: {
    maxAge: getEnvVariable<string>("COOKIES_MAX_AGE", "string"),
  },
  cors: {
    origin: getEnvVariable<string>("CORS_ORIGIN", "string"),
  },
  logs: {
    console_logs: getOptionalEnvVariable<Boolean>("LOG_CONSOLE", "boolean"),
    logs_path: getEnvVariable<string>("LOGS_PATH", "string"),
  },
};
