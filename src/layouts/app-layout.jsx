import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="container min-h-screen  mx-auto">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">Get Job</div>
    </div>
  );
};

export default AppLayout;
