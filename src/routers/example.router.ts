import { NextFunction, Request, Response, Router } from "express";
import { sendResponse } from "../utils/send-response";
import { ResponseOkDto } from "../dto/responses/response-ok.dto";
import { PaginatedDataDto } from "../dto/responses/paginated-data.dto";
import { NotFoundError } from "../errors/not-found-error";

const exampleRouter = Router();

/**
 * Routes examples to :
 * How to send a successful response with ResponseOkDto
 * - Return no data
 * - Return a single object
 * - return a list of objects
 * - return a page of objects
 * How to return errors with ResponseErrorDto
 *
 */

interface User {
  name: string;
  age: number;
}

exampleRouter.get("/no-data", (req, res) => {
  sendResponse(res, new ResponseOkDto("No data returned", 200));
});

exampleRouter.get("/single-object", (req, res) => {
  const responseJsonObj = {
    name: "John Doe",
    age: 30,
  };

  sendResponse(
    res,
    new ResponseOkDto<User>(
      "Single object retrieved successfully",
      200,
      responseJsonObj
    )
  );
});

exampleRouter.get("/list-of-objects", (req, res) => {
  const responseJsonArr: User[] = [
    {
      name: "John Doe",
      age: 30,
    },
    {
      name: "Jane Doe",
      age: 25,
    },
  ];

  sendResponse(
    res,
    new ResponseOkDto<User[]>(
      "List of objects retrieved successfully",
      200,
      responseJsonArr
    )
  );
});

exampleRouter.get("/page-of-objects", (req, res) => {
  const responseJsonArr: User[] = [
    {
      name: "John Doe",
      age: 30,
    },
    {
      name: "Jane Doe",
      age: 25,
    },
  ];

  const page = 1;
  const pageSize = 2;
  const total = 100;

  sendResponse(
    res,
    new ResponseOkDto<PaginatedDataDto<User>>(
      "Page of objects retrieved successfully",
      200,
      new PaginatedDataDto<User>(responseJsonArr, page, pageSize, total)
    )
  );
});

exampleRouter.get("/error", (req: Request, res: Response) => {
  throw new NotFoundError("someUserName", "User not found", "username");
});

exampleRouter.get(
  "/error-async",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      throw new NotFoundError("someUserName", "User not found", "username");
    } catch (error: any) {
      next(error);
    }
  }
);

exampleRouter.get(
  "/server-error-sim-untrusted",
  async (req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => {
      throw new Error("Server error");
    }, 1000);
    sendResponse(res, new ResponseOkDto("Sim OK", 200));
  }
);

exampleRouter.get(
  "/server-error-sim-trusted",
  async (req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => {
      throw new NotFoundError("User", "User not found", "username");
    }, 1000);
    sendResponse(res, new ResponseOkDto("Sim OK", 200));
  }
);

export default exampleRouter;
