export const requestClient = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const serverBaseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL as string;
  const apiUrl = `${serverBaseUrl}${url}`;

  try {
    const response = await fetch(apiUrl, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include", // Ensures cookies are sent with requests if needed
    });

    // Handle HTTP errors (e.g., 4xx, 5xx)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `HTTP Error ${response.status}: ${
          errorData.message || response.statusText
        }`
      );
    }

    // Return JSON response
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Request Error:", error.message);
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
