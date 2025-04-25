import { AxiosError } from "axios";
import { ZodError } from "zod";

export class AppError extends Error {
    public readonly cause: AxiosError | ZodError;
  
    constructor(message: string, cause: AxiosError | ZodError) {
      super(message);
      this.name = 'AppError';
      this.cause = cause;
    }
  
    static fromAxios(error: AxiosError): AppError {
      return new AppError('Network error', error);
    }
  
    static fromZod(error: ZodError): AppError {
      return new AppError('Validation error', error);
    }
  }
  