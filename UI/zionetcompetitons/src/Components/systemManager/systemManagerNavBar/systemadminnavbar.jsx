import { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../../Styles/navbar.css";
import { bgMode } from "../../../bgModeContext.js";
import { useAuth0 } from "@auth0/auth0-react";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import ModeNightIcon from "@mui/icons-material/ModeNight";

export const SystemAdminNavbar = () => {
  const { bgState, setBgState } = useContext(bgMode);
  const { logout } = useAuth0();
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
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg={bgState}
        variant={bgState}
        className="sanav"
      >
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
              <Nav.Link href="/Settings">Settings</Nav.Link>
            </Nav>

            <Nav>
              <Nav.Item
                as="button"
                className={`btn btn-${bgState}`}
                onClick={() => {
                  changeBG();
                }}
              >
                {bgState === "light" ? <Brightness5Icon /> : <ModeNightIcon />}
              </Nav.Item>
              <Nav.Link
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
