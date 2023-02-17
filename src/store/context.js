import { useState, createContext } from "react";
const Context = createContext({
  person:'',
  messages:[],
  docId:'',
  username:'',
  uid:'',
  night:'',
  setPerson:(person)=>{},
  setMessage:(message)=>{},
  setID:(id)=>{},
  setUsername:(name)=>{},
  setUid:(id)=>{},
  setNight:(mode)=>{},
});

export function ContextProvider(props) {
  const [person, setNewPerson] = useState();
  const [messages, setAllMessages] = useState();
  const [docId, setDocId] = useState();
  const [username, setName] = useState();
  const [uid, setuid] = useState(null);
  const [night, setNightMode] = useState();
  function setPerson(person) {
    setNewPerson(person);
  }
  function setMessage(message) {
    setAllMessages(message);
  }
  function setID(id) {
    setDocId(id);
  }
  function setUsername(name) {
    setName(name);
  }
  function setUid(id) {
    setuid(id);
  }
  function setNight(mode) {
    setNightMode(mode);
  }
  const contextValues = {
    person:person,
    messages:messages,
    username:username,
    uid:uid,
    docId:docId,
    night:night,
    setPerson:setPerson,
    setMessage:setMessage,
    setID:setID,
    setUsername:setUsername, 
    setUid:setUid,
    setNight:setNight, 
  };
  return<Context.Provider value={contextValues}>{props.children}</Context.Provider>
}
export default Context