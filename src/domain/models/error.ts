export interface ServerError {
  response: {
    status: number;
    message: string;
    error: string;
  };
}
