import React from "react";
import "./trash.scss";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
import DisplayPages from "../../DisplayPages";

function Trash() {
  return (
    <DisplayPages>
      <div className="content">
        <StaticHeader title={"Trash"} />
      </div>
    </DisplayPages>
  );
}

export default Trash;
