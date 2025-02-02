import { auth } from "@/auth";
import ProfileNav from "@/components/dashboard/ProfileNav";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile | Luxeon - Redefine your space",
  description: "The user profile page",
};

const Profile = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <div className="my-container">
      <h2 className="text-xl lg:text-2xl font-medium">
        Hello, {session?.user?.name}
      </h2>
      <ProfileNav />

      <div className="mt-5">{children}</div>
    </div>
  );
};

export default Profile;
