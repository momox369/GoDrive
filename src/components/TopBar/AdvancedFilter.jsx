import React from "react";
import { Form, Button } from "react-bootstrap";
import "./advancedfilter.scss";

function AdvancedSearch() {
  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your search logic here
  };

  return (
    <Form className="p-4" style={{ minWidth: "300px" }} onSubmit={handleSubmit}>
      {/* Similar structure for each form group */}
      <Form.Group className="mb-3 row">
        <Form.Label className="col-sm-3 col-form-label font-weight-bold">
          Type
        </Form.Label>
        <div className="col-sm-4">
          <Form.Select style={{ color: "gray" }}>
            <option>Any</option>
            {/* ... other options ... */}
          </Form.Select>
        </div>
      </Form.Group>
      <Form.Group className="mb-3 row">
        <Form.Label className="col-sm-3 col-form-label font-weight-bold">
          Owner
        </Form.Label>
        <div className="col-sm-4">
          <Form.Select style={{ color: "gray" }}>
            <option>Anyone</option>
            {/* ... other options ... */}
          </Form.Select>
        </div>
      </Form.Group>
      <Form.Group className="mb-3 row">
        <Form.Label className="col-sm-3 col-form-label font-weight-bold">
          Has the words
        </Form.Label>
        <div className="col-sm-7">
          <Form.Control
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
          <Form.Select style={{ color: "gray" }}>
            <option>Anywhere</option>
            {/* ... other options ... */}
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
        <Button variant="outline-secondary" className="me-2 reset-btn">
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
