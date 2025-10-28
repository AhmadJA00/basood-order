import React from "react";
import { Outlet } from "react-router";
import Footer from "./Components/Footer";

export default function Layout() {
  return (
    <main className="pb-20">
      <Outlet />
      <Footer />
    </main>
  );
}
