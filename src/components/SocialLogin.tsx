import { doSocialLogin } from "@/actions";
import React from "react";

const SocialLogin = () => {
  return (
    <div>
      <form action={doSocialLogin} className="space-x-3">
        <button
          className="border border-black rounded-xl p-2"
          type="submit"
          name="action"
          value="google"
        >
          Google
        </button>
        <button
          className="border border-black rounded-xl p-2"
          type="submit"
          name="action"
          value="github"
        >
          Github
        </button>
      </form>
    </div>
  );
};

export default SocialLogin;
