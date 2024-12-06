import axios from "axios";

export const userSignup = async (userData: {
  name: string | null | undefined;
  email: string | null | undefined;
  password?: string | null | undefined;
}) => {
  return await axios.post("http://localhost:4000/api/users", userData);
};
