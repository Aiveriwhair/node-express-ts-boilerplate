import { appEnv } from "@utils/env-loader";
import { logger } from "@loggers/logger";
import { Server } from "./server";

process.on("uncaughtException", (err: any) => {
  logger.error("[ERROR] Uncaught Exception: ", err);
  process.exit(1);
});

process.on("unhandledRejection", (err: any) => {
  logger.error("[ERROR] Unhandled Rejection: ", err);
  process.exit(1);
});

const port = appEnv.server.port;
export const app = Server.getInstance().app;
export const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
