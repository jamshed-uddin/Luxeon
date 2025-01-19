import { auth } from "@/auth";
import React from "react";

const Dashboard = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div>
      {/* top widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="h-44  shadow-md rounded-xl"></div>
        <div className="h-44  shadow-md rounded-xl"></div>
        <div className="h-44  shadow-md rounded-xl"></div>
      </div>
    </div>
  );
};

export default Dashboard;
