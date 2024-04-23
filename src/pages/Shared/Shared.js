import React from "react";
import "./shared.scss";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
import DisplayPages from "../../DisplayPages";
function Shared() {
  return (
    <DisplayPages>
      <div className="content">
        <StaticHeader title={"Shared With Me"} />
      </div>
    </DisplayPages>
  );
}

export default Shared;
