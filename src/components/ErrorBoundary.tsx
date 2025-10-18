import React from "react";
import { useLocation, useNavigate, useRouteError } from "react-router-dom";

function ErrorFallback() {
  const error = useRouteError();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.error("Router Error:", error);

  // React.useEffect(() => {
  //   if (error.response.status === 401) {
  //     navigate(`/login?prevRoute=${pathname}`);
  //   }
  // }, [pathname]);

  return "error";
  // <div role="alert">
  //   <h2>Oops! Something went wrong</h2>
  //   <p>
  //     {error.response.status} - {error.response.data.error}
  //   </p>
  //   <p>{error.response.data?.message || error.response.message}</p>
  //   <button onClick={() => window.location.reload()}>Try Again</button>
  // </div>
}

export default ErrorFallback;
