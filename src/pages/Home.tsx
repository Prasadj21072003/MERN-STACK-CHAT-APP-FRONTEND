import Messagecontainer from "../components/Messagecontainer";
import Nochatrcontainer from "../components/Nochatrcontainer";
import Sidebar from "../components/Sidebar";
import Useconversation from "../zustand/Useconversation";

const Home = () => {
  const { selectedconversation } = Useconversation();
  //h-[650px]
  return (
    <div className="font-bold  h-[95%] w-[98%] max-md:h-full max-md:w-full   flex justify-center items-center ">
      <div className="bg-[#171B1D] overflow-hidden flex   rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-700 h-full w-full max-md:w-[400px] max-sm:w-full   ">
        <Sidebar />
        {selectedconversation ? <Messagecontainer /> : <Nochatrcontainer />}
      </div>
    </div>
  );
};

export default Home;
