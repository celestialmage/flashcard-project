import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import RootRouter from "./RootRouter";
import NotFound from "./NotFound";
import Home from "./Home";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <RootRouter />
      </div>
    </>
  );
}

export default Layout;
