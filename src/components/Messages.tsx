import { memo, useEffect, useState } from "react";
import { useAuthcontext } from "../Context/Authcontext";
import Useconversation from "../zustand/Useconversation";
import { motion } from "framer-motion";

const Messages = memo(({ msg }: { msg: any }) => {
  const [side, setside] = useState("");
  const [sender, setsender] = useState({
    fullName: "",
    profilepic: "",
  });

  const { authuser } = useAuthcontext();
  const { getconversations } = Useconversation();

  const Time = ({ msg }: { msg: any }) => {
    var t = new Date(msg.createdAt);
    var d = String(t).substring(16, 21);
    return d;
  };

  const getsenderpic = () => {
    if (msg.senderId !== authuser?.id) {
      for (let i = 0; i < getconversations.length; i++) {
        if (msg.senderId === getconversations[i].id) {
          setsender({
            fullName: getconversations[i]?.fullName,
            profilepic: getconversations[i]?.profilepic,
          });
        }
      }
    }
  };

  useEffect(() => {
    msg.senderId === authuser?.id ? setside("right") : setside("left");
    Time({ msg });

    getsenderpic();
  }, []);

  return (
    <div className="w-full  ">
      <div className={`w-full ${side === "right" ? "flex" : "hidden"}  `}>
        <div className="flex gap-[10px] w-[60%] my-[10px]  ml-auto   ">
          <div className=" w-[100%] text-right ">
            <p className="flex flex-col bg-blue-400 ml-auto text-left  py-[5px] px-[10px]  break-all w-fit  rounded-[10px] rounded-tr-[0px] text-white font-light">
              <span className="text-[12px] font-medium text-right ">You</span>{" "}
              {msg?.body}
            </p>
            <span className="text-[12px] font-thin text-white relative right-[5px] ">
              {Time({ msg })}
            </span>
          </div>
          <img
            src={authuser?.profilepic}
            width={40}
            height={30}
            className="rounded-full min-w-[30px] max-h-[35px]"
          />
        </div>
      </div>

      <div
        className={`w-full ${
          side === "left" ? "flex" : "hidden"
        } items-start  `}
      >
        <motion.div
          className="flex gap-[10px]  my-[10px] w-[60%]   "
          animate={{ x: [0, 10, -10, 0] }}
          transition={{ delay: 1.2 }}
        >
          <img
            src={sender?.profilepic}
            width={40}
            height={30}
            className="rounded-full min-w-[30px] max-h-[35px]"
          />

          <div className=" w-[100%] text-left ">
            <p className="flex flex-col  bg-gray-700 py-[5px] px-[10px] text-left  rounded-tl-[0px] rounded-[10px] text-white font-light break-all w-fit">
              <span className="text-[12px] font-medium">
                {sender?.fullName}
              </span>{" "}
              {msg?.body}
            </p>
            <span className="text-[12px] font-thin text-white relative left-[5px] ">
              {Time({ msg })}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

export default Messages;
