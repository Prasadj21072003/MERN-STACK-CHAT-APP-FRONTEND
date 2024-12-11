import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import Useconversation from "../zustand/Useconversation";
import { memo, useEffect, useRef, useState } from "react";
import { useAuthcontext } from "../Context/Authcontext";
import axios from "axios";
import Messages from "./Messages";
import Uselistenmsg from "./Uselistenmsg";
import { usesocketcontext } from "../Context/Socketcontext";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { ThreeCircles, Oval } from "react-loader-spinner";
import { backend } from "../data";

const Messagecontainer = memo(() => {
  const { authuser } = useAuthcontext();
  const [inputmsg, setinputmsg] = useState("");
  const [clearinput, setclearinput] = useState("");
  const [loading, setloading] = useState(false);

  const [groupmem, setgroupmem] = useState<string[]>([]);
  const { onilneusers }: any = usesocketcontext();

  const {
    messageloading,
    setmessageloading,
    selectedconversation,
    message,
    setmessage,
    convo,
    setconvo,
    getconversations,
  } = Useconversation();

  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const getmsg = async () => {
    try {
      if (selectedconversation.hasOwnProperty("groupname")) {
        const res = await axios.get(
          `${backend}/api/message/group/${selectedconversation?.conversationId}`,
          {
            headers: {
              token: `${authuser?.acesstoken}`,
            },
          }
        );

        setmessage(res?.data?.message);
      } else {
        const res = await axios.get(
          `${backend}/api/message/${selectedconversation.id}`,
          {
            headers: {
              token: `${authuser?.acesstoken}`,
            },
          }
        );

        setmessage(res?.data);
        setmessageloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const newinput = async () => {
    try {
      setclearinput("");
      if (inputmsg !== "") {
        setloading(true);

        if (selectedconversation.hasOwnProperty("groupname")) {
          const res = await axios.post(
            `${backend}/api/message/sendgroupmsg`,
            {
              message: inputmsg,
              ids: selectedconversation?.participantIds,
              groupname: selectedconversation?.groupname,
            },
            {
              headers: {
                token: `${authuser?.acesstoken}`,
              },
            }
          );
          console.log(res?.data);

          setinputmsg("");
          setloading(false);
          getmsg();

          const refcurrent = ref?.current;
          if (refcurrent) {
            refcurrent.scrollTop = refcurrent.scrollHeight;
          }
        } else {
          const res = await axios.post(
            `${backend}/api/message/sendmsg/${selectedconversation.id}`,
            { message: inputmsg },
            {
              headers: {
                token: `${authuser?.acesstoken}`,
              },
            }
          );
          console.log(res?.data);

          setinputmsg("");
          setloading(false);
          getmsg();

          const refcurrent = ref?.current;
          if (refcurrent) {
            refcurrent.scrollTop = refcurrent.scrollHeight;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getmsg();

    const refcurrent = ref?.current;
    if (refcurrent) {
      refcurrent.scrollTop = refcurrent.scrollHeight;
    }
  }, [selectedconversation]);

  useEffect(() => {
    if (selectedconversation.hasOwnProperty("groupname")) {
      let data: string[] = [];
      for (let i = 0; i < getconversations?.length; i++) {
        for (let j = 0; j < selectedconversation.participantIds?.length; j++) {
          if (selectedconversation.participantIds[j] === getconversations[i].id)
            data.push(getconversations[i].fullName);
        }
      }
      setgroupmem(data);
    }
  }, [selectedconversation]);

  const online = onilneusers?.includes(selectedconversation.id);

  Uselistenmsg();

  return (
    <div
      className={`bg-[#202329] border-l-[1px] border-slate-700  md:w-[80%] ${
        convo ? "max-md:visible" : "max-md:hidden"
      } max-lg:w-full   relative`}
    >
      <div className=" border px-[20px] h-[70px] w-full border-t-[1px] border-slate-700 flex items-center cursor-pointer ">
        {convo && (
          <span
            className="text-white mr-[10px] md:hidden"
            onClick={() => setconvo(false)}
          >
            <ArrowCircleLeftOutlinedIcon />
          </span>
        )}
        {selectedconversation.hasOwnProperty("groupname") ? (
          <img
            src="https://img.freepik.com/free-vector/employee-group-portrait-illustration_74855-5495.jpg?t=st=1725308829~exp=1725312429~hmac=5d72a6b6b5f7d74cb5813695e710e7905f3e5f9b628cccb5757f2a3f97210a21&w=1060"
            alt=""
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px] object-cover"
          />
        ) : (
          <img
            src={selectedconversation?.profilepic}
            alt=""
            width={50}
            height={50}
            className="rounded-full"
          />
        )}
        <div
          className={` flex ${
            online | selectedconversation.hasOwnProperty("groupname")
              ? "flex-col"
              : "justify-center items-center"
          }   h-[45px]  `}
        >
          {selectedconversation.hasOwnProperty("groupname") ? (
            <span className="text-white font-semibold ml-[20px]">
              {" "}
              {selectedconversation?.groupname}{" "}
            </span>
          ) : (
            <span className="text-white font-semibold ml-[20px]">
              {" "}
              {selectedconversation?.fullName}{" "}
            </span>
          )}

          {selectedconversation.hasOwnProperty("groupname") ? (
            <div className="relative  items-center gap-[6px]  w-fit flex ml-[20px] ">
              <span
                className={`text-white font-thin  italic text-[13px] relative bottom-[0px]  `}
              >
                <span>You </span>
                {groupmem
                  ?.map((m, i) => <span key={i}>{m + " "}</span>)
                  .slice(0, 3)}{" "}
                <span> ...</span>
              </span>
            </div>
          ) : (
            online && (
              <div className="relative  items-center gap-[6px]  w-fit flex ml-[20px]">
                <span
                  className={`bg-orange-500 w-[12px] h-[12px] rounded-full   `}
                />
                <span
                  className={`text-white font-thin  italic text-[13px] relative bottom-[2px]  `}
                >
                  online
                </span>
              </div>
            )
          )}
        </div>
      </div>
      {
        <div className="w-full h-full ">
          {messageloading ? (
            <div className="w-full h-[78%]  flex justify-center items-center">
              <Oval
                visible={true}
                height="130"
                width="130"
                color="white"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <div
              className="bg-[#202329]    w-full  h-[78%] py-[10px] px-[20px] overflow-y-auto relative flex flex-col overflow-x-hidden   "
              ref={ref}
            >
              {message?.map((item: any, i: any) => (
                <Messages key={i} msg={item} />
              ))}
            </div>
          )}
        </div>
      }
      <div className=" absolute bottom-[0px] border px-[20px] lg:h-[68px] max-lg:h-[65px] w-full border-t-[1px] border-slate-700 flex items-center cursor-pointer ">
        <div className="w-full flex relative items-center  bg-slate-800  mr-[15px] rounded-lg ">
          <input
            type="text"
            name=""
            id=""
            value={clearinput}
            placeholder="send message"
            onChange={(e) => {
              setinputmsg(e.target.value);
              setclearinput(e.target.value);
            }}
            className="bg-slate-800 w-[93%] mr-[20px]  px-[10px] py-[11px]  border-none text-sm rounded-lg text-white focus:outline-none relative"
          />
        </div>
        {loading ? (
          <ThreeCircles
            visible={true}
            height="25"
            width="25"
            color="#B1AFFF"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <span className="text-white " onClick={newinput}>
            <ArrowCircleUpOutlinedIcon fontSize="medium" />
          </span>
        )}
      </div>
    </div>
  );
});

export default Messagecontainer;
