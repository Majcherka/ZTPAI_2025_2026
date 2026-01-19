import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Tab, Tabs } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [key, setKey] = useState('user'); // 'user' lub 'admin'
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await api.post('/token', formData);
      const { access_token, role } = response.data;

      if (key === 'admin' && role !== 'ADMIN') {
        setError("To konto nie posiada uprawnień administratora!");
        return;
      }

      localStorage.setItem('token', access_token);
      localStorage.setItem('role', role);

      if (key === 'admin') {
        navigate('/admin-dashboard'); 
      } else {
        navigate('/'); 
      }
      
      window.location.reload();

    } catch (err) {
      console.error(err);
      setError('Błędny email lub hasło.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Zaloguj się</h2>
      
      <Tabs
        id="login-tabs"
        activeKey={key}
        onSelect={(k) => { setKey(k); setError(''); }}
        className="mb-4"
        justify
      >
        <Tab eventKey="user" title="Użytkownik">
           <Alert variant="info" className="mt-3">Logowanie dla osób szukających mieszkania.</Alert>
        </Tab>
        <Tab eventKey="admin" title="Administrator">
           <Alert variant="warning" className="mt-3">Logowanie do panelu zarządzania.</Alert>
        </Tab>
      </Tabs>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Adres Email</Form.Label>
          <Form.Control 
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
            type="password" 
            placeholder="Hasło" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </Form.Group>

        <Button variant={key === 'admin' ? "danger" : "primary"} type="submit" className="w-100">
          Zaloguj jako {key === 'admin' ? 'Administrator' : 'Użytkownik'}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;