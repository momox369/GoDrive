import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";
import { useAuth } from "./AuthProvider";

const ShareModal = ({ show, onHide, onShare, fileId, name }) => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { fetchUsers, users, setUsers, error, setError } = useAuth();

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSearch(`${user.username} (${user.email})`);
    setUsers([]);
  };

  const handleShare = () => {
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
        <Modal.Title>Share "{name}"</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ marginTop: "1rem" }}>
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
          {search && users.length > 0 && (
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
