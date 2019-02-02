import {NextFunction, Request, Response} from "express";
import {wrapAsync} from "../src";

describe("wrapAsync", () => {
  it("Should catch exceptions of a function passed into it.", async () => {
    const error = new Error('Catch me.');
    const fn = wrapAsync(() => {
      throw error
    });
    expect(fn).toThrow(error);
  });

  it("Should call next with the error when an async function passed into it throws.", async () => {
    const error = new Error('Catch me.');
    const nextFn = jest.fn();
    // @ts-ignore
    const fn = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
      throw error;
    });

    await fn(undefined, undefined, nextFn); // tslint:disable-line:no-unsafe-any
    expect(nextFn).toHaveBeenCalledWith(error);
  });

  it("Should call next with the arguments when an async function passed into it calls next.", async () => {
    const nextFn = jest.fn();
    // @ts-ignore
    const fn = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
      next("Custom content.");
    });

    await fn(undefined, undefined, nextFn); // tslint:disable-line:no-unsafe-any
    expect(nextFn).toHaveBeenCalledWith("Custom content.");
  });

  it("Should accept a non-async function.", async () => {
    const nextFn = jest.fn();
    // @ts-ignore
    const fn = wrapAsync((req: Request, res: Response, next: NextFunction) => {
      next("Custom content.");
    });

    await fn(undefined, undefined, nextFn); // tslint:disable-line:no-unsafe-any
    expect(nextFn).toHaveBeenCalledWith("Custom content.");
  });

  it("Should accept a non-async function erroring.", async () => {
    const error = new Error('Catch me.');
    const nextFn = jest.fn();
    // @ts-ignore
    const fn = wrapAsync((req: Request, res: Response, next: NextFunction) => {
      next(error)
    });

    await fn(undefined, undefined, nextFn); // tslint:disable-line:no-unsafe-any
    expect(nextFn).toHaveBeenCalledWith(error);
  });

  it("Should handle thenables.", async () => {
    const error = new Error('Catch me.');
    let thenable: {
      then(): void;
    };
    let triggerFailure: (error: Error) => void;
    const registeringThenable = new Promise((resolve: () => void) => {
      thenable = {
        // @ts-ignore
        then: jest.fn((success: () => void, fail: () => void) => {
          triggerFailure = fail;
          resolve();
        })
      }
    });

    const next = jest.fn();
    const catchingThenable = wrapAsync(() => thenable)(undefined, undefined, next); // tslint:disable-line:no-unsafe-any
    await registeringThenable;
    expect(thenable.then).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    triggerFailure(error);
    await catchingThenable; // tslint:disable-line:no-unsafe-any
    expect(next).toHaveBeenCalledWith(error);
  });
});
