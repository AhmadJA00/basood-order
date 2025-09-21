import React from "react";
import { type UserData, type UserSeation } from "../type";
import { HTTP } from "../axios";
import helpers from "../helpers";
import AuthContext from "../context/AuthContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = React.useState<UserData | null>({
    id: helpers.getCookie("id"),
    fullName: helpers.getCookie("fullname"),
    email: helpers.getCookie("email"),
    username: helpers.getCookie("username"),
    imageUrl: helpers.getCookie("imageurl"),
  });
  const [userSeation, setUserSeation] = React.useState<UserSeation | null>({
    refreshToken: helpers.getCookie("refreshtoken"),
    token: helpers.getCookie("token"),
    expired: helpers.getCookie("expired"),
    permissions: helpers.getCookie("permissions"),
  });
  const [userLoggedIn, setUserLoggedIn] = React.useState<boolean>(
    helpers.getCookie("expired") < Date.now().toString()
      ? false
      : !!helpers.getCookie("token")
  );
  console.log(currentUser);
  console.log(userSeation);
  console.log(userLoggedIn);

  const expireToken = async () => {
    try {
      if (userSeation?.refreshToken) {
        await HTTP.post("/user/revoke-token", {
          token: userSeation.refreshToken,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = helpers.getCookie("refreshtoken");
    if (!refreshToken) {
      return;
    }

    try {
      const res = await HTTP.post("/user/refresh-token", {
        token: refreshToken,
      });

      console.log(res);
      helpers.setCookie("token", res?.data?.token);
      helpers.setCookie("refreshtoken", res?.data?.refreshToken);

      HTTP.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res?.data?.token}`;
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    // const interval = setInterval(refreshAccessToken, 1000000000000);
    // return () => clearInterval(interval);
  }, []);

  const signOut = async () => {
    expireToken();
    setUserLoggedIn(false);
    setCurrentUser(null);
    setUserSeation(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signOut,
        userLoggedIn,
        currentUser,
        userSeation,
        setUserLoggedIn,
        setCurrentUser,
        setUserSeation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
