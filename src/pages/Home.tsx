import Messagecontainer from "../components/Messagecontainer";
import Nochatrcontainer from "../components/Nochatrcontainer";
import Sidebar from "../components/Sidebar";
import Useconversation from "../zustand/Useconversation";

const Home = () => {
  const { selectedconversation } = Useconversation();

  return (
    <div className="font-bold  h-[90%] w-full  flex justify-center items-center">
      <div className="bg-[#171B1D] flex rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-700 h-[650px]  ">
        <Sidebar />
        {selectedconversation ? <Messagecontainer /> : <Nochatrcontainer />}
      </div>
    </div>
  );
};

export default Home;
