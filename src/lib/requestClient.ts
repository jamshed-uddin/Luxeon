import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const requestClient = async <T>(
  url: string,
  options: AxiosRequestConfig
): Promise<T> => {
  const serverBaseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL as string;

  const apiUrl = `${serverBaseUrl}${url}`;

  try {
    const response = await axios({
      url: apiUrl,
      withCredentials: true,
      ...options,
    });
    return response.data as T;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data;
    } else {
      throw error;
      // throw new Error("Something went wrong");
    }
  }
};
