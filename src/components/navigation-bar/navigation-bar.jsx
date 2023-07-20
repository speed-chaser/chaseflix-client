import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut, handleShow }) => {
  return (
    <Navbar bg="dark" className="text-light" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={`./movies`}>
          ChaseFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar=nav">
          <Nav className="me-auto">
            {" "}
            <Nav.Link as={Link} to="./Movies" className="mx-2">
              Movies
            </Nav.Link>
            <Nav.Link as={Link} to="./Users" className="mx-2">
              Users
            </Nav.Link>
          </Nav>
          {user ? (
            <>
              <NavDropdown title="Account" id="collapsible-nav-dropdown">
                <NavDropdown.Item
                  as={Link}
                  to={`./Users/${user.Username}`}
                  className="mx-2"
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={onLoggedOut} className="mx-2">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/signup" className="mx-2">
                Signup
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="mx-2">
                Login
              </Nav.Link>
            </>
          )}

          <br />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
