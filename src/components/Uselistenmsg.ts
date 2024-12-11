import { useEffect, useRef } from "react";
import { usesocketcontext } from "../Context/Socketcontext";
import Useconversation from "../zustand/Useconversation";
import { backend, sound } from "../data";
import axios from "axios";
import { useAuthcontext } from "../Context/Authcontext";

const Uselistenmsg = () => {
  const { Socket }: any = usesocketcontext();

  const { authuser } = useAuthcontext();
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const {
    setmessage,
    getconversations,
    selectedconversation,
    setmsgfrom,
    msgfrom,
    setupdatedconvo,
    updatedconvo,
    setrefreshfrom,
  } = Useconversation();

  useEffect(() => {
    Socket?.on("groupid", ({ msgfromid }: { msgfromid: string }) => {
      convoupdate(msgfromid);
      refreshmsg();

      return () => Socket.off("groupid");
    });
  }, [Socket]);

  useEffect(() => {
    Socket?.on(
      "newMessage",
      ({ msgfromid }: { newmsg: any; msgfromid: string }) => {
        convoupdate(msgfromid);
        refreshmsg();

        return () => Socket.off("newMessage");
      }
    );
  }, [Socket]);

  var convoupdate = (msgfromid: any) => {
    if (msgfromid !== selectedconversation?.id) {
      setmsgfrom([...msgfrom, msgfromid]);
      setrefreshfrom((prev: boolean) => !prev);
    }
    let temp = {};
    getconversations?.map((i: any) => {
      if (i?.id === msgfromid) {
        temp = i;
      }
    });

    let arr = [];
    if (updatedconvo.length > 0) {
      arr = updatedconvo?.filter((i: any) => i?.id !== msgfromid);
    } else {
      arr = getconversations?.filter((i: any) => i?.id !== msgfromid);
    }
    if (Object.keys(temp).length > 0) {
      let arr2 = [];
      arr2 = [temp].concat(arr);

      setupdatedconvo(arr2);
    }
  };

  var refreshmsg = async () => {
    const res = await axios.get(
      `${backend}/api/message/${selectedconversation.id}`,
      {
        headers: {
          token: `${authuser?.acesstoken}`,
        },
      }
    );

    await setmessage(res?.data);

    const refcurrent = ref?.current;
    if (refcurrent) {
      refcurrent.scrollTop = refcurrent.scrollHeight;
    }

    let beat = new Audio(sound);
    beat.play();
  };
};

export default Uselistenmsg;
