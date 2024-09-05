import React, { useEffect, useState } from "react";

import { useAuthcontext } from "../Context/Authcontext";
import Name from "./Name";

const Groups = ({ data }) => {
  const { authuser } = useAuthcontext();

  return (
    <div>
      {data?.map((item, i) => (
        <Name key={i} conversation={item} />
      ))}
    </div>
  );
};

export default Groups;
