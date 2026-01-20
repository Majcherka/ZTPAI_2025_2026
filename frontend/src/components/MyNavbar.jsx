import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function MyNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    navigate('/login');
    window.location.reload();
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          Roommate Finder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">Ogłoszenia</Nav.Link>
            
            {/* Widoczne tylko dla zalogowanych */}
            {token && (
              <>
                <Nav.Link as={Link} to="/favorites">Ulubione</Nav.Link>
                <Nav.Link as={Link} to="/add-listing">Dodaj Ogłoszenie</Nav.Link>
                <Nav.Link as={Link} to="/profile">Mój Profil</Nav.Link>
                <Nav.Link as={Link} to="/messages">Wiadomości</Nav.Link>
                
                {/* --- TO JEST NOWA CZĘŚĆ: Przycisk widoczny TYLKO dla Admina --- */}
                {role === 'ADMIN' && (
                   <Nav.Link as={Link} to="/admin-dashboard" className="text-danger fw-bold border border-danger rounded ms-2 me-2 px-3">
                     Panel Admina
                   </Nav.Link>
                )}
                {/* ----------------------------------------------------------- */}

                <Button variant="outline-danger" onClick={handleLogout} className="ms-2">
                  Wyloguj
                </Button>
              </>
            )}

            {/* Widoczne tylko dla niezalogowanych */}
            {!token && (
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