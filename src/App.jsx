import { useState } from "react";
import "./App.css";
import { useCallback, useEffect } from "react";

function App() {
  const [length, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*(){}[]`~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <section className="w-full h-screen bg-gray-800 text-white p-5">
      <div className="w-full flex-col flex justify-center items-center gap-2 h-1/4 max-w-md bg-gray-400 mx-auto rounded-xl p-5">
        <div>
          <input
            type="text"
            value={password}
            placeholder="password"
            readOnly

            className="outline-none p-2 rounded-sm text-black"
          />
          <button className="bg-gray-800 rounded-sm p-1 ">Copy</button>
        </div>
        <div className="w-full  mt-5 flex justify-evenly items-center">
          <div className="flex justify-center items-center gap-1">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => {
                setLenght(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex justify-center items-center gap-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label> Number</label>
          </div>
          <div className="flex justify-center items-center gap-1">
            <input
              type="checkbox"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label> Character</label>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
