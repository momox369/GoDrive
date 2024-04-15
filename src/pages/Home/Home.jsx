import React from "react";

import "./home.scss";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
import FilterBar from "../../components/FIlterBar/FilterBar";
import FileTable from "../../components/FileTable/FileTable";
import FileMenu from "../../components/FileMenu/FileMenu";

function Home() {
  return (
    <div className="content">
      <StaticHeader title={"Welcome to GoDrive"} />
      <FilterBar />
      {/* <FileMenu /> */}
      <FileTable />
    </div>
  );
}

export default Home;
