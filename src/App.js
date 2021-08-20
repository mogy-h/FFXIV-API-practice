import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  // const [inputName, setInputName] = useState("");
  // const [inputServer, setInputServer] = useState("");
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  // const [server, setServer] = useState("");
  const [icon, setIcon] = useState("");

  const xiv = axios.create({
    baseURL: "https://xivapi.com",
  });

  const fetchCharacterData = async () => {
    return await xiv.get("/character/search", {
      params: {
        name: name,
        server: "Chocobo",
      },
    });
  };

  useEffect(() => {
    fetchCharacterData().then((res) => {
      console.log(res.data.Results[0]);
      setName(res.data.Results[0].Name);
      setIcon(res.data.Results[0].Avatar);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const setValue = (e) => {
    e.preventDefault();
    setName(input);
    setInput("")
  };

  return (
    <div className="App">
      <div>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
          placeholder="名前を入力"
        />
        <button onClick={setValue}>送信</button>
      </div>

      <img src={icon} alt="キャラアイコン" />
      <p> {name} </p>
    </div>
  );
}

export default App;
