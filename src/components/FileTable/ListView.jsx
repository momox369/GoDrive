import React from "react";
import { Table } from "react-bootstrap";
import "./filetable.scss";

const ListView = ({ items, isSelected, handleItemClick }) => (
    <Table hover className="file-table">
        <thead style={{ position: "sticky", top: "0" }}>
        <tr>
            <th>Name</th>
            <th>Reason</th>
            <th>Owner(s)</th>
            <th>Location</th>
        </tr>
        </thead>
        <tbody>
        {items.map((item) => (
            <tr
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={
                    isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
                }
            >
                <td
                    className={
                        isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
                    }
                >
                    {item.name}
                </td>
                <td
                    className={
                        isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
                    }
                >
                    {item.reason}
                </td>
                <td
                    className={
                        isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
                    }
                >
                    {(item.owner.length === 1)? "Owner: " + item.owner : "Owners: " + item.owner.join(", ") }
                </td>
                <td
                    className={
                        isSelected.some((f) => f.id === item.id) ? "selected-file" : ""
                    }
                >
                    {item.location}
                </td>
            </tr>
        ))}
        </tbody>
    </Table>
);

export default ListView;
