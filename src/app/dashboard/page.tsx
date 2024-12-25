import { auth } from "@/auth";
import React from "react";

const Dashboard = async () => {
  const session = await auth();
  console.log(session);

  return <div>overview</div>;
};

export default Dashboard;
