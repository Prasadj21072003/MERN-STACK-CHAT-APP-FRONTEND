import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backend } from "../data";

const Signup = () => {
  const [usernameerror, setusernameerror] = useState(false);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    fullName: "",
    gender: "",
  });

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputs);
    try {
      if (
        inputs?.username &&
        inputs?.password &&
        inputs?.fullName &&
        inputs?.gender !== ""
      ) {
        const res = await axios.post(`${backend}/api/auth/signup`, inputs);

        console.log(res?.data);
        if (res?.data === "Username already exists") {
          setusernameerror(true);
        } else {
          setusernameerror(false);
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(`the error is: ${error}`);
    }
  };

  return (
    <div
      className=" relative m-[10px]  w-[400px] h-[480px] max-sm:h-[570px] bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100
"
    >
      <h1 className="font-bold text-[40px] text-white ml-[20px] my-[5px]">
        Signup
      </h1>
      <form
        action=""
        onSubmit={handlesubmit}
        method="post"
        className="w-[96%] h-fit flex flex-col gap-[10px] px-[20px]  py-[20px]  m-auto  max-sm:h-[440px] max-sm:mb-[15px] "
      >
        <div className="flex gap-[10px]  max-sm:flex-col h-[90px] max-sm:mb-[20px]  max-sm:h-[160px] ">
          <div className="w-[80%] max-sm:w-full flex flex-col gap-[10px]">
            <span className="text-white ">Fullname</span>
            <input
              type="text"
              name=""
              id=""
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
              className="bg-slate-800  px-[10px] py-[9px]  border-none text-sm rounded-lg text-white focus:outline-none w-full"
            />
          </div>
          <div className="w-[80%] max-sm:w-full flex flex-col gap-[10px]  ">
            <span className="text-white ">Username</span>
            <input
              type="text"
              name=""
              id=""
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              className="bg-slate-800 w-full px-[10px] py-[9px]  border-none text-sm rounded-lg text-white focus:outline-none"
            />
            {usernameerror && (
              <span className="text-red-600 text-[14px] relative left-[5px]">
                Username already exists
              </span>
            )}
          </div>
        </div>

        <span className="text-white ">Password</span>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          className="bg-slate-800  px-[10px] py-[9px]  border-none text-sm rounded-lg text-white focus:outline-none"
        />
        <span className="text-white ">Gender (select the gender)</span>
        <select
          name="gender"
          value={inputs.gender}
          onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
          className="bg-slate-800  px-[10px] py-[9px]  border-none text-sm rounded-lg text-white focus:outline-none"
        >
          <option></option>

          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 py-[10px] text-white font-semibold mt-[10px] "
        >
          Signup
        </button>
      </form>
      <div className="px-[20px]  ">
        <span className=" text-white relative bottom-[6px]">
          have an account?
          <Link to="/login" className="text-blue-400">
            {" "}
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
