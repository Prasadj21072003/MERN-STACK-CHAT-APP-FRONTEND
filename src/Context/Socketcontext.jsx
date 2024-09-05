import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthcontext } from "./Authcontext";
import io from "socket.io-client";
import { backend } from "../../../data";

const SocketContext = createContext(undefined);

export const usesocketcontext = () => {
  return useContext(SocketContext);
};

const socketurl = `${backend}`;

export const Socketcontextprovider = ({ children }) => {
  var socketstate = null;
  const [onilneusers, setonlineusers] = useState([]);
  const [Socket, setSocket] = useState();
  const { authuser } = useAuthcontext();

  useEffect(() => {
    const fetchonlineuser = async () => {
      try {
        if (authuser) {
          const socket = io(socketurl, {
            query: {
              userId: authuser.id,
            },
          });

          setSocket(socket);

          socket.on("getOnlineUsers", (users) => {
            setonlineusers(users);
          });

          return () => {
            socket.close();
            socketstate = null;
          };
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchonlineuser();
  }, [authuser]);

  return (
    <SocketContext.Provider value={{ Socket, onilneusers }}>
      {children}
    </SocketContext.Provider>
  );
};
