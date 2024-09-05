import { useEffect } from "react";
import { usesocketcontext } from "../Context/Socketcontext";
import Useconversation from "../zustand/Useconversation";

const Uselistenmsg = () => {
  const { Socket }: any = usesocketcontext();

  const { message, setmessage } = Useconversation();

  useEffect(() => {
    Socket?.on("newMessage", ({ newmsg }: { newmsg: any }) => {
      setmessage([...message, newmsg]);

      return () => Socket.off("newMessage");
    });
  }, [Socket, message, setmessage]);
};

export default Uselistenmsg;
