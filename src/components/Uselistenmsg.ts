import { useEffect, useState } from "react";
import { usesocketcontext } from "../Context/Socketcontext";
import Useconversation from "../zustand/Useconversation";
import { sound } from "../data";

const Uselistenmsg = () => {
  const { Socket }: any = usesocketcontext();
  const [from, setfrom] = useState("");
  const {
    message,
    setmessage,
    getconversations,
    selectedconversation,
    setmsgfrom,
    msgfrom,
    setupdatedconvo,
    updatedconvo,
  } = Useconversation();

  useEffect(() => {
    if (from !== undefined) {
      setmsgfrom([...msgfrom, from]);

      let arr;
      let arr2;
      let temp = {};
      getconversations?.map((i: any) => {
        if (i?.id === from) {
          temp = i;
        }
      });

      if (updatedconvo.length > 0) {
        arr = updatedconvo?.filter((i: any) => i?.id !== from);
      } else {
        arr = getconversations?.filter((i: any) => i?.id !== from);
      }

      if (Object.keys(temp).length > 0) {
        arr2 = [temp].concat(arr);

        setupdatedconvo(arr2);
      }
      setfrom("");
    }
  }, [from, setfrom]);

  useEffect(() => {
    Socket?.on("groupid", ({ msgfromid }: { msgfromid: string }) => {
      if (msgfromid !== selectedconversation?.id) {
        setfrom(msgfromid);

        let beat = new Audio(sound);
        beat.play();
      }

      return () => Socket.off("groupid");
    });
  }, [Socket, message, setmessage]);

  useEffect(() => {
    Socket?.on(
      "newMessage",
      ({ newmsg, msgfromid }: { newmsg: any; msgfromid: string }) => {
        if (msgfromid !== selectedconversation?.id) {
          setfrom(msgfromid);

          let beat = new Audio(sound);
          beat.play();
        }

        setmessage([...message, newmsg]);

        return () => Socket.off("newMessage");
      }
    );
  }, [Socket, message, setmessage]);
};

export default Uselistenmsg;
