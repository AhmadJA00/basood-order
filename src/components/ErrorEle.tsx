import React from "react";
import { useLocation, useNavigate, useRouteError } from "react-router-dom";
import { HTTP } from "../axios";
import useAuth from "../hooks/useAuth";

export default function ErrorEle() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const routeError = useRouteError();
  const userAuth = useAuth();
  React.useEffect(() => {
    const catchUnauthorized = async () => {
      if (routeError?.response?.status === 401) {
        await userAuth.signOut();
        navigate(`/login?prevRouter=${pathname}`);
      }
    };
    catchUnauthorized();
  }, [pathname]);

  return (
    <section className="d-flex flex-column gap-4 justify-content-center align-items-center h-full">
      <div className="w-full m-20 shadow">
        <div className="card bg-green-700 text-white d-flex justify-content-center align-items-center gap-3 p-5">
          {routeError?.response?.status && (
            <p style={{ fontSize: "10rem" }} className="h1 text-white">
              {routeError?.response?.status}
            </p>
          )}
          {routeError?.response?.statusText && (
            <p className="h2 text-white">{routeError?.response?.statusText}</p>
          )}
          <p className="h6 text-white">
            کێشەیەک ڕوویداوە، تکایە بگەڕێوە پەڕەی سەرەکی یان پەیوەندی بە
            گەشەپێدەرەکەوە بکە.{" "}
          </p>
        </div>
      </div>
    </section>
  );
}
