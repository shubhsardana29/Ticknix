export class AppError extends Error {
    statusCode: number;
    
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export const handleError = (err: Error | AppError) => {
    if (err instanceof AppError) {
      return { message: err.message, statusCode: err.statusCode };
    }
    return { message: 'An unexpected error occurred', statusCode: 500 };
  };