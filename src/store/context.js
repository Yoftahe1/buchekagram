import { useState, createContext } from "react";
const Context = createContext({
  person:'',
  image:'',
  comments:[],
  docId:'',
  username:'',
  uid:'',
  night:'',
  setPerson:(person)=>{},
  setImage:(image)=>{},
  setComment:(message)=>{},
  setID:(id)=>{},
  setUsername:(name)=>{},
  setUid:(id)=>{},
  setNight:(mode)=>{},
});

export function ContextProvider(props) {
  const [person, setNewPerson] = useState();
  const [image, setPic] = useState();
  const [comments, setAllComment] = useState();
  const [docId, setDocId] = useState();
  const [username, setName] = useState();
  const [uid, setuid] = useState(null);
  const [night, setNightMode] = useState();
  function setPerson(person) {
    setNewPerson(person);
  }
  function setImage(newImage) {
    setPic(newImage);
  }
  function setComment(comment) {
    setAllComment(comment);
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
    image:image,
    comments:comments,
    username:username,
    uid:uid,
    docId:docId,
    night:night,
    setPerson:setPerson,
    setImage:setImage,
    setComment:setComment,
    setID:setID,
    setUsername:setUsername, 
    setUid:setUid,
    setNight:setNight, 
  };
  return<Context.Provider value={contextValues}>{props.children}</Context.Provider>
}
export default Context