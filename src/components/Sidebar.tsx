import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAuthcontext } from "../Context/Authcontext";
import { useEffect, useState } from "react";
import axios from "axios";
import Useconversation from "../zustand/Useconversation";
import Names from "./Names";
import NewGroup from "./NewGroup";
import Groups from "./Groups";
import CloseIcon from "@mui/icons-material/Close";
import { usesocketcontext } from "../Context/Socketcontext";
import { backend } from "../../../data";

const Sidebar = () => {
  const { setauthuser, authuser } = useAuthcontext();
  const { Socket }: any = usesocketcontext();

  const {
    getconversations,
    setgetconversations,
    setSelectedconversation,
    setconvo,
    convo,
    newroom,
    makeroomresult,
    setmakeroomresult,
    message,
  } = Useconversation();
  const [groups, setgroups] = useState([]);

  type conversationtype = {
    id: string;
    fullName: string;
    profilepic: string;
  };
  type grouptype = {
    id: string;
    groupname: string;
  };

  const [searchinput, setsearchinput] = useState("");

  const handlelogout = async () => {
    const res = await axios.post(`${backend}/api/auth/logout`);
    console.log(res);
    setauthuser(null);
  };

  const getconversation = async () => {
    try {
      const res = await axios.get(`${backend}/api/message/conversations`, {
        headers: {
          token: `${authuser?.acesstoken}`,
        },
      });

      setgroups(res?.data[1]);

      setgetconversations(res?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

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

  const search = (e: any) => {
    e.preventDefault();

    groups.map((item: grouptype) => {
      if (item?.groupname.toLowerCase().includes(searchinput.toLowerCase())) {
        if (item?.groupname.toLowerCase() === searchinput.toLowerCase()) {
          setSelectedconversation(item);
          setconvo(true);
          console.log(item);
          setsearchinput("");
        }
      }
    });

    getconversations.map((item: conversationtype) => {
      if (item?.fullName.toLowerCase().includes(searchinput.toLowerCase())) {
        if (item?.fullName.toLowerCase() === searchinput.toLowerCase()) {
          setSelectedconversation(item);
          setconvo(true);
          console.log(item);
          setsearchinput("");
        }
      }
    });
  };

  Socket.on("refresh", () => {
    getconversation();
  });

  return (
    <div
      className={`bg-[#202329] flex flex-col   h-full w-[330px]   ${
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

        {!newroom && <Groups data={groups} />}
        <Names data={getconversations} />
      </div>
      <div
        className="px-[20px] cursor-pointer h-[62px] flex items-center  border-t-[1px] border-slate-700  w-full "
        onClick={handlelogout}
      >
        <LogoutOutlinedIcon className="text-white" />
      </div>
    </div>
  );
};

export default Sidebar;
