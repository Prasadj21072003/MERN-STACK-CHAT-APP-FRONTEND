import { useEffect, useState } from "react";
import { usesocketcontext } from "../Context/Socketcontext";
import Useconversation from "../zustand/Useconversation";
import axios from "axios";
import { useAuthcontext } from "../Context/Authcontext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { backend } from "../data";

const Name = ({ conversation }: { conversation: any }) => {
  const { authuser } = useAuthcontext();
  const {
    setSelectedconversation,
    selectedconversation,
    setconvo,
    setmessage,
    message,
    newroom,
    roommember,
    setroommember,
    setmakeroomresult,

    msgfrom,
    setmsgfrom,
  } = Useconversation();
  const [lastmsg, setlastmsg] = useState();
  const { onilneusers }: any = usesocketcontext();
  const online = onilneusers?.includes(conversation?.id);
  const [checked, setchecked] = useState(false);

  const getmsg = async () => {
    if (conversation.hasOwnProperty("groupname") === false) {
      try {
        const res = await axios.get(
          `${backend}/api/message/${conversation.id}`,
          {
            headers: {
              token: `${authuser?.acesstoken}`,
            },
          }
        );

        var i = res?.data?.length - 1;
        if (i >= 0) {
          setlastmsg(res?.data[i]?.body);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.get(
          `${backend}/api/message/group/${conversation?.conversationId}`,
          {
            headers: {
              token: `${authuser?.acesstoken}`,
            },
          }
        );

        var i = res?.data?.message?.length - 1;
        if (i >= 0) {
          setlastmsg(res?.data?.message[i]?.body);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getmsg();
  }, [message]);

  useEffect(() => {
    setmessage();

    if (msgfrom.includes(selectedconversation?.id)) {
      let arr = msgfrom?.filter((i: string) => i !== selectedconversation?.id);

      setmsgfrom(arr);
    }
  }, [selectedconversation]);

  return (
    <div
      className={` ${
        conversation.hasOwnProperty("groupname") && newroom
          ? "hidden"
          : "relative"
      } px-[20px] h-[70px] w-full border-y-[1px] border-slate-700 flex items-center cursor-pointer ${
        conversation.id === selectedconversation?.id ? "bg-slate-800" : ""
      } `}
      onClick={(e) => {
        e.preventDefault();

        if (newroom === false) {
          setSelectedconversation(conversation);
          setconvo(true);
        }
        setmakeroomresult();
      }}
    >
      <div className=" relative">
        {conversation.hasOwnProperty("groupname") ? (
          <img
            src="https://img.freepik.com/free-vector/employee-group-portrait-illustration_74855-5495.jpg?t=st=1725308829~exp=1725312429~hmac=5d72a6b6b5f7d74cb5813695e710e7905f3e5f9b628cccb5757f2a3f97210a21&w=1060"
            alt=""
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px] object-cover"
          />
        ) : (
          <img
            src={conversation?.profilepic}
            alt=""
            width={50}
            height={50}
            className="rounded-full"
          />
        )}
        <span
          className={`${
            online ? "visible" : "hidden"
          } bg-orange-500 w-[12px] h-[12px] rounded-full absolute right-[0px] top-[3px]  border border-black`}
        />
      </div>

      <div className=" flex flex-col pr-[10px]  w-[80%] overflow-hidden  relative">
        {conversation.hasOwnProperty("groupname") ? (
          <span className="text-white font-semibold ml-[20px]">
            {" "}
            {conversation?.groupname}{" "}
          </span>
        ) : (
          <span className="text-white font-semibold ml-[20px]">
            {" "}
            {conversation?.fullName}{" "}
          </span>
        )}

        {!newroom && msgfrom.includes(conversation?.id) && (
          <span className="text-slate-300 italic font-normal text-[13px] ml-[20px] flex items-center">
            New Message{" "}
            <div className="rounded-full w-[10px] h-[10px] bg-blue-400 ml-[10px]"></div>
          </span>
        )}

        {!newroom && !msgfrom.includes(conversation?.id) && (
          <span className="text-white font-normal text-[13px]  ml-[20px]">
            {lastmsg}
          </span>
        )}
      </div>

      {newroom && !conversation.hasOwnProperty("groupname") && (
        <div
          onClick={() => {
            setchecked(!checked);
          }}
        >
          {checked ? (
            <CheckCircleIcon
              className="text-green-400"
              onClick={(e) => {
                e.preventDefault();

                if (roommember.includes(conversation?.id)) {
                  setroommember(
                    roommember.filter((m: any) => m !== conversation?.id)
                  );
                }
              }}
            />
          ) : (
            <CircleOutlinedIcon
              className="text-blue-600"
              onClick={(e) => {
                e.preventDefault();
                if (!roommember.includes(conversation?.id)) {
                  if (!roommember.includes(authuser?.id)) {
                    setroommember([
                      ...roommember,
                      conversation?.id,
                      authuser?.id,
                    ]);
                  } else {
                    setroommember([...roommember, conversation?.id]);
                  }
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Name;
