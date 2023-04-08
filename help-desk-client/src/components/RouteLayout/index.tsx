import React from "react";
import { useLocation, Link } from "react-router-dom";
import { AppBar, Button } from "@mui/material";

interface RouteLayoutProps {
  component: React.ComponentType<any>;
}

export default function RouteLayout({
  component: Component,
}: RouteLayoutProps) {
  let { pathname } = useLocation();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          display: "flex",
          height: "60px",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            my: 2,
            color: "white",
            display: "block",
            "*": {
              color: "white",
              textDecoration: `${pathname === "/" ? "underline" : "none"}`,
            },
          }}
        >
          <Link to="/">Home</Link>
        </Button>{" "}
        |
        <Button
          sx={{
            my: 2,
            color: "white",
            display: "block",
            "*": {
              color: "white",
              textDecoration: `${pathname === "/staff" ? "underline" : "none"}`,
            },
          }}
        >
          <Link to="/staff">Admin</Link>
        </Button>
      </AppBar>
      <Component />
    </>
  );
}
