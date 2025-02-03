import { AxiosError } from "axios";

export const requestClient = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const serverBaseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL as string;

  const apiUrl = `${serverBaseUrl}${url}`;

  try {
    // const response = await axios({
    //   url: apiUrl,
    //   withCredentials: true,
    //   ...options,
    // });

    const response = await fetch(apiUrl, {
      ...options,
    });

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data;
    } else {
      throw error;
      // throw new Error("Something went wrong");
    }
  }
};
