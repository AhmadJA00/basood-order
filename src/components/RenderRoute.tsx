// RenderRoute.tsx
import React, { Suspense } from "react";
import Loading from "./Loading";

export default function RenderRoute(props: { element: React.ReactElement }) {
  return (
    <Suspense fallback={<Loading isLoading={true} />}>{props.element}</Suspense>
  );
}
