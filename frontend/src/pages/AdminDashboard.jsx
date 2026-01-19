import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Table, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users'); 
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      setError("Brak dostępu. Tylko administrator może zobaczyć tę stronę.");
      if (err.response && (err.response.status === 403 || err.response.status === 401)) {
        setTimeout(() => {
            localStorage.removeItem('token');
            navigate('/login');
        }, 2000);
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-danger">Panel Administratora</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <div className="shadow-sm p-3 mb-5 bg-white rounded">
        <h4>Lista Użytkowników</h4>
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Rola</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === 'ADMIN' ? (
                    <Badge bg="danger">ADMIN</Badge>
                  ) : (
                    <Badge bg="primary">USER</Badge>
                  )}
                </td>
                <td>
                  {user.is_active ? (
                    <span className="text-success fw-bold">Aktywny</span>
                  ) : (
                    <span className="text-muted">Nieaktywny</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default AdminDashboard;