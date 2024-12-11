import React, { memo, useEffect } from "react";

import Nameskeleton from "./Nameskeleton";
import Namerender from "./Namerender";
import Useconversation from "../zustand/Useconversation";

const Names = memo(({ data }) => {
  const { convoload } = Useconversation();

  return (
    <div>{!convoload ? <Nameskeleton /> : <Namerender data={data} />}</div>
  );
});

export default Names;

/*  {data?.map((item, i) => (
  <Name key={i} conversation={item} />
))} */
