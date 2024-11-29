import { auth } from "@/auth";
import ProfileNav from "@/components/dashboard/ProfileNav";
import React from "react";

const Profile = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  console.log(session);
  return (
    <div className="my-container">
      <h2 className="text-3xl font-medi">Hello, {session?.user?.name}</h2>
      <ProfileNav />

      <div className="mt-5">{children}</div>
    </div>
  );
};

export default Profile;
