import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";

const ShareModal = ({ show, onHide, onShare, fileId }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async (query) => {
    setError("");
    try {
      const response = await axios.get(`http://localhost:3001/search-users`, {
        params: { query },
      });
      setUsers(response.data); // Assuming the API returns an array of users
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
      setUsers([]);
    }
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSearch(`${user.username} (${user.email})`);
    setUsers([]);
  };

  const handleShare = () => {
    console.log("Sharing File ID:", fileId);
    if (selectedUser && fileId) {
      onShare(fileId, selectedUser._id);
      onHide();
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (
      !selectedUser ||
      (selectedUser &&
        `${selectedUser.username} (${selectedUser.email})` !== e.target.value)
    ) {
      setSelectedUser(null);
      fetchUsers(e.target.value);
    }
  };

  const handleClose = () => {
    onHide();
    setSearch("");
    setSelectedUser(null);
    setUsers([]);
    setError("");
  };


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Share File</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="text-danger">{error}</div>}
        <Form>
          <Form.Group>
            <Form.Label>Search Users</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username or email"
              value={search}
              onChange={handleSearchChange}
            />
          </Form.Group>
          {users.length > 0 && (
            <ListGroup variant="flush">
              {users.map((user) => (
                <ListGroup.Item
                  key={user._id}
                  action
                  onClick={() => handleUserSelect(user)}
                  active={selectedUser && selectedUser._id === user._id}
                >
                  {user.username} ({user.email})
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleShare}
          disabled={!selectedUser}
        >
          Share
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShareModal;
