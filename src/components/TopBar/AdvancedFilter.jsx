import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./advancedfilter.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFiles } from "../FileController";
import { FileDoc } from "@phosphor-icons/react";
import { useAuth } from "../AuthProvider";

function AdvancedSearch() {
  // Handle the form submission
  const [type, setType] = useState("Any");
  const [owner, setOwner] = useState("Anyone");
  const [words, setWords] = useState("");
  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("Anywhere");
  const [inTrash, setInTrash] = useState(false);
  const [starred, setStarred] = useState(false);
  const navigate = useNavigate();
  const { onSearchComplete } = useFiles();
  const { users, fetchUsers } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = {
        type: type !== "Any" ? type : undefined,
        owner: owner !== "Anyone" ? owner : undefined,
        words: words.trim() ? words : undefined,
        itemName: itemName.trim() ? itemName : undefined,
        location: location !== "Anywhere" ? location : undefined,
        inTrash: inTrash,
        starred: starred,
      };
      const response = await axios.get(
        "http://localhost:3001/files/advanced-search",
        { params }
      );
      onSearchComplete(response.data);
      navigate("/searchResults");
    } catch (error) {
      console.error("Failed to fetch advanced search results:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  });

  return (
    <Form className="p-4" style={{ minWidth: "300px" }} onSubmit={handleSubmit}>
      {/* Similar structure for each form group */}
      <Form.Group className="mb-3 row">
        <Form.Label className="col-sm-3 col-form-label font-weight-bold">
          Type
        </Form.Label>
        <div className="col-sm-4">
          <Form.Select
            style={{ color: "gray" }}
            onChange={(e) => setType(e.target.value)}
          >
            <option className="file-types">Word Document (.docx)</option>
            <option className="file-types">Excel Sheet (.xls)</option>
            <option className="file-types">Text File (.txt)</option>
            <option className="file-types"> Zip and Rar</option>
            <option className="file-types"> PDF</option>
            <option className="file-types"> Video</option>
            {/* ... other options ... */}
          </Form.Select>
        </div>
      </Form.Group>
      <Form.Group className="mb-3 row">
        <Form.Label className="col-sm-3 col-form-label font-weight-bold">
          Owner
        </Form.Label>
        <div className="col-sm-4">
          <Form.Select
            style={{ color: "gray" }}
            onChange={(e) => setOwner(e.target.value)}
          >
            {users.map((user) => (
              <option key={user._id} value={user.username}>
                {user.username}
              </option>
            ))}
          </Form.Select>
        </div>
      </Form.Group>
      <Form.Group className="mb-3 row">
        <Form.Label className="col-sm-3 col-form-label font-weight-bold">
          Has the words
        </Form.Label>
        <div className="col-sm-7">
          <Form.Control
            onChange={(e) => setWords(e.target.value)}
            style={{ color: "gray" }}
            type="text"
            placeholder="Enter words found in the file"
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3 row">
        <Form.Label className="col-sm-3 col-form-label font-weight-bold">
          Item Name
        </Form.Label>
        <div className="col-sm-7">
          <Form.Control
            onChange={(e) => setItemName(e.target.value)}
            style={{ color: "gray" }}
            type="text"
            placeholder="Enter a term that matches part of the file name"
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3 row">
        <Form.Label className="col-sm-3 col-form-label font-weight-bold">
          Location
        </Form.Label>
        <div className="col-sm-4">
          <Form.Select
            style={{ color: "gray" }}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>Anywhere</option>
            <option>Local</option>
            <option>Remote</option>
          </Form.Select>
        </div>
      </Form.Group>
      <Form.Group className="mb-3">
        <div className="d-flex justify-content-center">
          <Form.Check
            type="checkbox"
            label="In trash"
            className="custom-checkbox me-3"
            id="checkbox-in-trash"
          />
          <Form.Check
            type="checkbox"
            label="Starred"
            className="custom-checkbox"
            id="checkbox-starred"
          />
        </div>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button
          variant="outline-secondary"
          className="me-2 reset-btn"
          onClick={() => {
            setType("Any");
            setOwner("Anyone");
            setWords("");
            setItemName("");
            setLocation("Anywhere");
            setInTrash(false);
            setStarred(false);
          }}
        >
          Reset
        </Button>
        <Button variant="primary" type="submit" className=" custom-btn">
          Search
        </Button>
      </div>
    </Form>
  );
}

export default AdvancedSearch;
