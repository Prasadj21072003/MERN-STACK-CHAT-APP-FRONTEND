import React from "react";
import Name from "./Name";

const Namerender = ({ data }) => {
  return (
    <div>
      {data?.map((item, i) => (
        <Name key={i} conversation={item} />
      ))}
    </div>
  );
};

export default Namerender;
