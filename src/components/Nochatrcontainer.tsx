import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useAuthcontext } from "../Context/Authcontext";

const Nochatrcontainer = () => {
  const { authuser } = useAuthcontext();

  return (
    <div className=" border-l-[1px] border-slate-700 md:w-[80%] max-md:hidden max-lg:w-full  relative text-bold flex justify-center items-center">
      <div className="flex flex-col  h-[150px]  text-white text-center text-[30px] gap-[15px] ">
        <span className="font-semibold text-blue-400">{`Welcome ${authuser?.fullName}`}</span>
        <span className="font-normal">Select a chat to start messaging</span>
        <ChatBubbleOutlineOutlinedIcon className="m-auto" />
      </div>
    </div>
  );
};

export default Nochatrcontainer;
