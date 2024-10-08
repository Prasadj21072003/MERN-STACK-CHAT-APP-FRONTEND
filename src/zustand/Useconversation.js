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
  makeroomresult: [],
  setmakeroomresult: (room) => set({ makeroomresult: room }),
  newmsgcount: 0,
  setnewmsgcount: (count) => set({ newmsgcount: count }),
  msgfrom: [],
  setmsgfrom: (msgfromids) => set({ msgfrom: msgfromids }),
  updatedconvo: [],
  setupdatedconvo: (updatedconvo) => set({ updatedconvo: updatedconvo }),
  convoorder: [],
  setconvoorder: (convoorder) => set({ convoorder: convoorder }),
}));

export default Useconversation;
