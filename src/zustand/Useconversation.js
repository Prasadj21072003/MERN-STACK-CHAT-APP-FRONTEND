import { create } from "zustand";

const Useconversation = create((set) => ({
  selectedconversation: null,
  setSelectedconversation: (conversation) =>
    set({ selectedconversation: conversation }),
  getconversations: [],
  setgetconversations: (conversations) =>
    set({ getconversations: conversations }),
  message: [],
  setmessage: (message) => set({ message: message }),
  convo: false,
  setconvo: (convo) => set({ convo: convo }),
  newroom: false,
  setnewroom: (boolean) => set({ newroom: boolean }),
  roommember: [],
  setroommember: (mem) => set({ roommember: mem }),
  makeroomresult: [],
  setmakeroomresult: (room) => set({ makeroomresult: room }),
}));

export default Useconversation;
