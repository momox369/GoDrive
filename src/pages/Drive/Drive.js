import React from "react";
import "./drive.scss";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
import FilterBar from "../../components/FIlterBar/FilterBar";

function Drive() {
  return (
    <div className="content">
      <StaticHeader title={"Drive"} />
      <FilterBar />
    </div>
  );
}

export default Drive;
