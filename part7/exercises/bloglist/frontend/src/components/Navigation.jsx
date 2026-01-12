import { Link } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

import { Nav, Navbar, Button, Container } from 'react-bootstrap'

const Navigation = ({ user }) => {
  const { logout } = useAuth()

  const handleLogout = (e) => {
    e.preventDefault()

    logout()
  }

  return (
    <Navbar expand="lg" variant="dark" bg="dark" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="pt-0">
          The Blog App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="gap-2">
            <Nav.Link as={Link} to="/">
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
            {user ? (
              <Nav.Item className="d-flex align-items-center">
                <Navbar.Text className="me-3">
                  {user.name} signed in
                </Navbar.Text>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  Sign out
                </Button>
              </Nav.Item>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
