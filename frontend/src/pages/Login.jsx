import React, { useState } from 'react';
import api from '../api'; 
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new URLSearchParams();
    formData.append('username', email); 
    formData.append('password', password);

    try {
      const response = await api.post('/auth/login', formData);
      
      localStorage.setItem('token', response.data.access_token);
      
      navigate('/');
      window.location.reload(); 
    } catch (err) {
      console.error(err);
      setError('Nieprawidłowy email lub hasło.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Logowanie</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Adres Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Wpisz email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hasło</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Hasło" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Zaloguj się
        </Button>
      </Form>
    </Container>
  );
}

export default Login;