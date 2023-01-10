import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../../Styles/navbar.css";
import { bgMode } from "../../../bgModeContext";
import { LogoutButton } from "../../exports.js";

export const UsersNavBar = () => {
  const { bgState, setBgState } = useContext(bgMode);
  useEffect(() => {
    const firstTime = async () => {
      if (bgState === "undefined") await setBgState("light");
      localStorage.setItem("Theme", bgState);
    };
    firstTime();
  }, [bgState]);
  const changeBG = () => {
    bgState === "light" ? setBgState("dark") : setBgState("light");
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg={bgState} variant={bgState}>
      <Container>
        <Navbar.Brand href="/">
          <img
            src="https://www.zion-net.co.il/wp-content/uploads/2021/06/ZioNET-Logo_new_new-156x66.png"
            width="70"
            height="30"
            className="d-inline-block align-top"
            alt="zionet logo"
          />
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Management">Management</Nav.Link>
            <Nav.Link href="#pricing">Participate</Nav.Link>
            <Nav.Link href="#pricing">Settings</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Item
              as="button"
              className={`btn btn-${bgState}`}
              onClick={() => {
                changeBG();
              }}
            >
              {`${bgState} mode`}
            </Nav.Item>
            <Nav.Item>
              <LogoutButton />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
