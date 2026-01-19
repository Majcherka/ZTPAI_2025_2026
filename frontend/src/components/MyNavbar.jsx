import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function MyNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
    window.location.reload(); 
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Roommate Finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Ogłoszenia</Nav.Link>
            
            {token ? (
              //  DLA ZALOGOWANYCH
              <>
                <Nav.Link as={Link} to="/add-listing" className="text-warning">
                  + Dodaj Ogłoszenie
                </Nav.Link>
                <Button variant="outline-light" size="sm" onClick={handleLogout} className="ms-2">
                  Wyloguj
                </Button>
              </>
            ) : (
              //   DLA NIEZALOGOWANYCH
              <>
                <Nav.Link as={Link} to="/login">Logowanie</Nav.Link>
                <Nav.Link as={Link} to="/register">Rejestracja</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;