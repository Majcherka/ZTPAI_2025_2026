import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', {
        email: email,
        password: password
      });
      alert("Rejestracja udana! Możesz się zalogować.");
      navigate('/login');
    } catch (err) {
      setMsg('Błąd rejestracji. Może email jest zajęty?');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Rejestracja</h2>
      {msg && <Alert variant="danger">{msg}</Alert>}
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
             type="email" 
             value={email} 
             onChange={(e) => setEmail(e.target.value)} 
             required 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Hasło</Form.Label>
          <Form.Control 
             type="password" 
             value={password} 
             onChange={(e) => setPassword(e.target.value)} 
             required 
          />
        </Form.Group>
        <Button variant="success" type="submit" className="w-100">
          Zarejestruj się
        </Button>
      </Form>
    </Container>
  );
}

export default Register;