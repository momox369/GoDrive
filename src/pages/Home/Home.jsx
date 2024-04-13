import React from "react";

import "./home.scss";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
import FilterBar from "../../components/FIlterBar/FilterBar";
import FileTable from "../../components/FileTable/FileTable";

function Home() {
  return (
    <div className="content">
      <StaticHeader title={"Home"} />
      <FilterBar />
      <FileTable />
    </div>
  );
}

export default Home;
