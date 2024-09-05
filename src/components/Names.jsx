import React from "react";
import Name from "./Name";

const Names = ({ data }) => {
  return (
    <div>
      {data?.map((item, i) => (
        <Name key={i} conversation={item} />
      ))}
    </div>
  );
};

export default Names;
