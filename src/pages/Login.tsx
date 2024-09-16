import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthcontext } from "../Context/Authcontext";
import { ThreeCircles } from "react-loader-spinner";
import { backend } from "../data";

const Login = () => {
  const { setauthuser } = useAuthcontext();
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  const [inputs, setInputs] = useState({
    username: "random",
    password: "random",
  });

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (inputs?.username && inputs?.password !== "") {
        setloading(true);
        const res = await axios.post(`${backend}/api/auth/login`, inputs, {
          withCredentials: true,
        });
        if (res?.data?.id) {
          setauthuser(res?.data);
        } else {
          seterror(res?.data);
        }
        setloading(false);
      }
    } catch (error) {
      console.log(`the error is: ${error}`);
    }
  };

  return (
    <div
      className=" relative  w-[400px] h-[375px] bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100
 "
    >
      <h1 className="font-bold text-[40px] text-white ml-[20px]">Login</h1>
      <form
        onSubmit={handlesubmit}
        className="w-full h-fit flex flex-col gap-[10px] px-[20px]  py-[20px]"
      >
        <span className="text-white ">Username</span>
        <input
          type="text"
          name="username"
          id=""
          value={inputs?.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          className="bg-slate-800  px-[10px] py-[9px]  border-none text-sm rounded-lg text-white focus:outline-none"
        />
        <span className="text-white ">Password</span>
        <input
          type="text"
          name="password"
          id=""
          value={inputs?.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          className="bg-slate-800  px-[10px] py-[9px]  border-none text-sm rounded-lg text-white focus:outline-none"
        />
        {error && (
          <span className="text-red-500 text-[12px] m-auto">{error}</span>
        )}
        {loading ? (
          <button className="bg-blue-500 py-[10px] text-white font-semibold mt-[10px] flex justify-center items-center">
            <ThreeCircles
              visible={true}
              height="25"
              width="25"
              color="#B1AFFF"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 py-[10px] text-white font-semibold mt-[10px]"
          >
            Login
          </button>
        )}
      </form>
      <div className="px-[20px]  ">
        <span className=" text-white relative bottom-[6px]">
          Don't have an account?
          <Link to="/signup" className="text-blue-400">
            {" "}
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
