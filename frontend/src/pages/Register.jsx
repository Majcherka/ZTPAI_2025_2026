import React, { useState } from 'react';
import api from '../api'; 
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Hasła muszą być identyczne.');
      return;
    }

    try {
      await api.post('/auth/register', {
        email: email,
        password: password
      });
      setSuccess('Rejestracja udana! Przekierowywanie do logowania...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Wystąpił błąd podczas rejestracji.');
      }
    }
  };

  return (
    // ZMIANA: Container fluid + bg-light + vh-90
    <Container fluid className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '90vh' }}>
      <div className="shadow-lg p-5 bg-white rounded" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="mb-3 text-center fw-bold text-success">Załóż konto</h2>
        <p className="text-center text-muted mb-4">Dołącz do nas i znajdź swoje miejsce.</p>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Adres Email</Form.Label>
            <Form.Control 
              size="lg"
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hasło</Form.Label>
            <Form.Control 
              size="lg"
              type="password" 
              placeholder="Hasło" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Potwierdź hasło</Form.Label>
            <Form.Control 
              size="lg"
              type="password" 
              placeholder="Powtórz hasło" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </Form.Group>

          <Button variant="success" type="submit" size="lg" className="w-100 fw-bold">
            Zarejestruj się
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Register;