import React from "react";
import "./starred.scss";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
import DisplayPages from "../../DisplayPages";

function Starred() {
  return (
    <DisplayPages>
      <div className="content">
        <StaticHeader title={"Starred"} />
      </div>
    </DisplayPages>
  );
}

export default Starred;
