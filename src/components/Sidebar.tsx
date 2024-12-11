import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAuthcontext } from "../Context/Authcontext";
import { memo, useCallback, useEffect, useState } from "react";
import axios from "axios";
import Useconversation from "../zustand/Useconversation";
import Names from "./Names";
import NewGroup from "./NewGroup";

import CloseIcon from "@mui/icons-material/Close";
import { usesocketcontext } from "../Context/Socketcontext";
import { backend } from "../data";

const Sidebar = memo(() => {
  const { setauthuser, authuser } = useAuthcontext();
  const { Socket }: any = usesocketcontext();

  const {
    getconversations,
    setgetconversations,
    setSelectedconversation,
    setconvo,
    updatedconvo,
    convo,
    setconvoload,
    newroom,
    makeroomresult,
    setmakeroomresult,
    message,
  } = Useconversation();

  const [searchinput, setsearchinput] = useState("");

  const [order, setorder] = useState(false);

  const handlelogout = async () => {
    const res = await axios.post(`${backend}/api/auth/logout`);
    console.log(res);
    setauthuser(null);
  };

  const getconversation = useCallback(async () => {
    try {
      const res = await axios.get(`${backend}/api/message/conversations`, {
        headers: {
          token: `${authuser?.acesstoken}`,
        },
      });

      setgetconversations(res?.data[1].concat(res?.data[0]));
      setconvoload(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getconversation();
  }, [makeroomresult, setmakeroomresult, message]);

  useEffect(() => {
    getconversation();

    Socket.on("recieved-members", () => {
      console.log("recieved-members on ");
      getconversation();
    });
  }, []);

  useEffect(() => {
    if (updatedconvo?.length > 0) {
      setorder(true);
    }
  }, [updatedconvo]);

  const search = (e: any) => {
    e.preventDefault();

    getconversations.map((item: any) => {
      if (item?.hasOwnProperty("groupname")) {
        if (item?.groupname.toLowerCase().includes(searchinput.toLowerCase())) {
          if (item?.groupname.toLowerCase() === searchinput.toLowerCase()) {
            setSelectedconversation(item);
            setconvo(true);

            setsearchinput("");
          }
        }
      } else {
        if (item?.fullName.toLowerCase().includes(searchinput.toLowerCase())) {
          if (item?.fullName.toLowerCase() === searchinput.toLowerCase()) {
            setSelectedconversation(item);
            setconvo(true);

            setsearchinput("");
          }
        }
      }
    });
  };

  Socket.on("refresh", () => {
    getconversation();
  });

  return (
    <div
      className={`bg-[#202329] flex flex-col   h-full max-md:w-[400px] max-sm:w-[450px]  md:w-[450px]   ${
        convo ? "max-md:hidden" : "max-md:visible"
      } `}
    >
      {!newroom && (
        <div className=" flex items-center h-[70px] justify-evenly px-[10px] border-[1px] border-b-[0px] border-r-[0px] border-slate-700">
          <input
            type="text"
            name=""
            id=""
            value={searchinput}
            onChange={(e) => setsearchinput(e.target.value)}
            className="bg-slate-800 w-[80%]  px-[10px] py-[10px]  border-none text-sm rounded-lg text-white focus:outline-none"
          />
          <span
            onClick={(e) => {
              search(e);
            }}
          >
            <SearchOutlinedIcon className="text-white l cursor-pointer" />
          </span>
        </div>
      )}
      <div
        className={`${
          newroom ? "h-[94%]" : "h-[83%]"
        } overflow-y-auto overflow-x-hidden  `}
      >
        {makeroomresult === "groupname already existed" && (
          <div className="py-[10px] bg-red-500 text-white px-[10px] w-full  flex justify-between ">
            groupname already existed{" "}
            <CloseIcon
              className="cursor-pointer"
              onClick={() => setmakeroomresult()}
            />
          </div>
        )}
        <NewGroup />
        {order ? (
          <Names data={updatedconvo} />
        ) : (
          <Names data={getconversations} />
        )}
      </div>
      <div
        className="px-[20px] cursor-pointer h-[70px] flex items-center justify-between border-t-[1px] border-slate-700  w-full "
        onClick={handlelogout}
      >
        <div className="flex  items-center">
          <img
            src={authuser?.profilepic}
            alt=""
            className="rounded-full w-[50px] h-[50px] object-cover"
          />
          <span className="text-blue-400 font-bold ml-[20px]">
            {" "}
            {authuser?.fullName} ( You )
          </span>
        </div>
        <LogoutOutlinedIcon className="text-white" />
      </div>
    </div>
  );
});

export default Sidebar;
