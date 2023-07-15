import { StatusEnum } from '@/types/ApiTypes';

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data: unknown = await res?.json();
  return data;
};

export const handleError = (
  error: unknown,
): {
  statusCode: StatusEnum;
  data: { message: string };
} => {
  console.log('error: getHealthCheck', { error }, process.env.NODE_ENV, 'error');
  return { statusCode: StatusEnum.SERVER_ERROR, data: { message: 'Something went wrong!' } };
};
