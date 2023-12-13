"use client";

import React, { useState } from "react";
import SideBar from "./sidebar";
import TopBar from "./topbar";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <main>
      {/* sidebar */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="lg:pl-72">
        {/* topbar */}
        <TopBar setSidebarOpen={setSidebarOpen} />

        {/* main */}
        <main className="min-h-screen bg-zinc-50 py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </main>
  );
};

export default Wrapper;
