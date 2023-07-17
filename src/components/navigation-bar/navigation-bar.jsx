import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" data-bs-theme="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ChaseFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar=nav">
          <Nav className="me-auto"></Nav>
          {user ? (
            <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
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
          <Nav.Link as={Link} to="./Movies" className="mx-2">
            Movies
          </Nav.Link>
          <br />
          <Nav.Link as={Link} to={`/`} className="mx-2">
            Profile
          </Nav.Link>
          <Nav.Link as={Link} to="" className="mx-2">
            Settings
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
