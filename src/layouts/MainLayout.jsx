import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import "./MainLayout.css";

export default function MainLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="layout">

      <Navbar
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />

      <div className="layout-body">

        <Sidebar
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />

        <main className="content">
          {children}
        </main>

      </div>

      <Footer />

    </div>
  );
}