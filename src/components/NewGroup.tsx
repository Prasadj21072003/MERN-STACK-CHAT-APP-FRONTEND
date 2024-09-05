import { add, backend } from "../data";
import Useconversation from "../zustand/Useconversation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { usesocketcontext } from "../Context/Socketcontext";
import axios from "axios";
import { useAuthcontext } from "../Context/Authcontext";

const NewGroup = () => {
  const { Socket }: any = usesocketcontext();
  const { authuser } = useAuthcontext();
  const { newroom, setnewroom, roommember, setmakeroomresult } =
    Useconversation();
  const [room, setroom] = useState(false);
  const [input, setinput] = useState("");

  const makegroup = async (mem: any, input: string) => {
    try {
      const res = await axios.post(
        `${backend}/api/message/group`,
        { mem: mem, input: input },
        {
          headers: {
            token: `${authuser?.acesstoken}`,
          },
        }
      );

      setmakeroomresult(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setnewroom(room);
  }, [room]);

  return (
    <div
      className={`relative px-[20px] h-[70px] w-full border-y-[1px] border-slate-700 flex items-center cursor-pointer  `}
      onClick={(e) => {
        e.preventDefault();
        if (!room) {
          setroom(true);
        }
        setmakeroomresult();
      }}
    >
      {!newroom && (
        <div className=" relative">
          <img
            src={add}
            alt=""
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
      )}
      {!newroom && (
        <div className=" flex flex-col pr-[10px]  w-[80%] overflow-hidden  relative">
          <span className="text-white font-semibold ml-[20px]">New Group</span>
        </div>
      )}

      {newroom && (
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter Group Name"
          value={input}
          onChange={(e) => setinput(e.target.value)}
          className="bg-slate-800 w-[80%]  px-[10px] py-[10px] mr-[20px] border-none text-sm rounded-lg text-white focus:outline-none"
        />
      )}

      {newroom === true && (
        <div className=" flex gap-[10px]  ">
          <div
            className=""
            onClick={(e) => {
              e.preventDefault();
              setroom(false);
            }}
          >
            <CancelIcon fontSize="medium" className="text-red-400" />
          </div>

          <span
            className=""
            onClick={(e) => {
              e.preventDefault();
              setroom(false);
            }}
          >
            <CheckCircleIcon
              className="text-green-400"
              fontSize="medium"
              onClick={(e) => {
                e.preventDefault();
                if (roommember.length > 2 && input !== "") {
                  Socket.emit("join-room", { input });

                  makegroup(roommember, input);
                }
              }}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default NewGroup;
