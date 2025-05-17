import axios from "axios";

export const userSignup = async (userData: {
  name: string | null | undefined;
  email: string | null | undefined;
  provider: string;
  password?: string | null | undefined;
}) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users`,
    userData
  );
};
