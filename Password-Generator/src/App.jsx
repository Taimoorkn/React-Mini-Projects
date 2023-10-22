import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  const [includeChar, setIncludeChar] = useState(false);
  const [includeNum, setIncludeNum] = useState(false);
  const [range, setRange] = useState(5);
  const num = "0123456789";
  const char = "~`!@#$%^&*()_-+={[}]|:;<,>.?/";

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (includeChar) characterSet += char;
    if (includeNum) characterSet += num;
    for (let i = 0; i < range; i++) {
      const index = Math.floor(Math.random() * characterSet.length);
      pass += characterSet[index];
    }
    setPassword(pass);
  }, [includeChar, includeNum, range]);

  useEffect(() => {
    passwordGenerator();
  }, [includeChar, includeNum, range]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, []);

  return (
    <main>
      <h3>Password Generator</h3><br />
      <div className="main">
        <input type="text" value={password} readOnly ref={passwordRef} />
        <button className="copy" onClick={copyPassword}>Copy</button>
        <button onClick={passwordGenerator}>
          <svg
            fill="#ddd"
            height="20"
            viewBox="0 0 24 24"
            width="50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
      </div>
      <div className="inputs">
        <input className="range"
          type="range"
          name="password_range"
          min={5}
          max={20}
          value={range}
          onChange={(event) => setRange(event.target.value)}
        />
        <label>Length({range})</label>
        <input
          type="checkbox"
          name="numbers"
          checked={includeNum}
          onChange={() => setIncludeNum(!includeNum)} 
        />
        <label>Numbers</label>
        <input
          type="checkbox"
          name="characters"
          checked={includeChar}
          onChange={() => setIncludeChar(!includeChar)} 
        />
        <label>Characters</label>
      </div>
    </main>
  );
};

export default App;
