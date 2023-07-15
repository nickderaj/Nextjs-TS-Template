export enum StatusEnum {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export type ResponseData = {
  id: string | number;
  type: string;
  data: object;
  message?: string;
  error?: unknown;
};
