import React from "react";

import "./home.scss";
import StaticHeader from "../../components/StaticHeader/StaticHeader";
import FilterBar from "../../components/FIlterBar/FilterBar";

function Home() {
  return (
    <div className="content">
      <StaticHeader title={"Home"} />
      <FilterBar />
    </div>
  );
}

export default Home;
