import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Tab, Tabs, Row, Col } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [key, setKey] = useState('user'); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await api.post('/token', formData);
      const { access_token, role, user_id } = response.data;

      if (key === 'admin' && role !== 'ADMIN') {
        setError("To konto nie posiada uprawnień administratora!");
        return;
      }

      localStorage.setItem('token', access_token);
      localStorage.setItem('role', role);
      localStorage.setItem('user_id', user_id);

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
    <Container fluid className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '85vh' }}>
      {/* w-100 jest kluczowe, żeby Row nie zapadał się w d-flex */}
      <Row className="w-100 justify-content-center">
        {/* Szerokie ustawienia: 10/12 na średnich ekranach, 8/12 na dużych */}
        <Col xs={12} md={10} lg={8}> 
          <div className="shadow bg-white rounded p-4 p-md-5">
            <h2 className="mb-4 text-center text-primary fw-bold">Witaj ponownie</h2>
            
            <Tabs
              id="login-tabs"
              activeKey={key}
              onSelect={(k) => { setKey(k); setError(''); }}
              className="mb-4"
              justify
            >
              <Tab eventKey="user" title="Użytkownik" />
              <Tab eventKey="admin" title="Administrator" />
            </Tabs>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Adres Email</Form.Label>
                <Form.Control 
                  size="lg"
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Hasło</Form.Label>
                <Form.Control 
                  size="lg"
                  type="password" 
                  placeholder="Hasło" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </Form.Group>

              <Button 
                variant={key === 'admin' ? "danger" : "primary"} 
                type="submit" 
                size="lg"
                className="w-100 fw-bold py-3"
              >
                Zaloguj jako {key === 'admin' ? 'Administrator' : 'Użytkownik'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;