import React, { useEffect, useState } from 'react';
import api from '../api';
import { Container, Table, Badge, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Trash } from 'react-bootstrap-icons'; 

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('user_id'); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users'); 
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      setError("Brak dostępu.");
      if (err.response && (err.response.status === 403 || err.response.status === 401)) {
        setTimeout(() => {
            localStorage.removeItem('token');
            navigate('/login');
        }, 2000);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tego użytkownika? Tej operacji nie można cofnąć.")) {
      return;
    }

    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error(err);
      alert("Nie udało się usunąć użytkownika. " + (err.response?.data?.detail || ""));
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
              <th>Akcje</th>
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
                <td className="text-center">
                    {/* Wyświetlamy kosz tylko jeśli to nie jest konto aktualnie zalogowanego admina */}
                    {/* (Porównujemy jako stringi lub liczby, zależnie jak zapisało się w bazie) */}
                    <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        title="Usuń użytkownika"
                    >
                        <Trash />
                    </Button>
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