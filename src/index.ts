import { Server } from "./server";
import { logger } from "./loggers/logger";
import { appEnv } from "./utils/env-loader";
import { ErrorHandlerService } from "./services/error-handler.service";

process.on("uncaughtException", (err: any) => {
  const errorHandlerService =
    ErrorHandlerService.getInstance() as ErrorHandlerService;
  errorHandlerService.handleUncaughtException(err);
  if (!errorHandlerService.isTrustedError(err)) {
    process.exit(1);
  }
});

process.on("unhandledRejection", (reason: string, p: Promise<any>) => {
  throw reason;
});

const port = appEnv.server.port;
export const app = Server.getInstance().app;
export const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
