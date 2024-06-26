import React from "react";
import Stats from "./Stats";
import RecentlySold from "./RecentlySold";
import InHouseApplication from "./inhouse";

const Dashboard = () => {
  return (
    <div className=" py-28 px-4 sm:px-24 bg-[#f0f2f5]">
      {" "}
      <h2 className=" text-[#344767] font-medium text-xl sm:text-2xl">
        Dashboard
      </h2>
      <Stats />
      <RecentlySold />
      <InHouseApplication />
    </div>
  );
};

export default Dashboard;
