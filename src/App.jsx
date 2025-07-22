import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(16);
  const [numAllowed, setnumAllowed] = useState(true);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numAllowed) str += '0123456789';
    if (charAllowed) str += "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true); 

    setTimeout(() => {
      setCopied(false); 
    }, 2000);
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0d0d0d] via-[#1c052d] to-[#3a0ca3] px-4 relative">
      
      
      {copied && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg text-sm shadow-lg z-50 transition-opacity duration-500">
          Copied to clipboard
        </div>
      )}

      <div className="backdrop-blur-md bg-white/10 border border-white/20 text-white p-6 rounded-3xl shadow-2xl max-w-xl w-full">
        <h1 className="text-2xl text-center font-bold mb-6 tracking-wide">Password Generator</h1>

        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 bg-transparent text-white text-lg font-semibold tracking-wide outline-none placeholder-white/50 px-2"
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordtoClipboard}
            className="bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-2 rounded-full font-semibold shadow-lg hover:brightness-110 active:scale-95 active:shadow-inner transition-all duration-200"
          >
            COPY
          </button>
        </div>

        <div className="space-y-6">
          
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="accent-purple-600 w-full"
            />
            <label className="text-base font-semibold whitespace-nowrap">Length ({length})</label>
          </div>

          
          <div className="flex items-center gap-8 justify-center">
            <label className="flex items-center gap-2 cursor-pointer text-base font-semibold">
              <input
                type="checkbox"
                checked={numAllowed}
                onChange={() => {
                  setnumAllowed((prev) => !prev)
                }}
                className="accent-purple-500"
              />
              <span>Numbers</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-base font-semibold">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => {
                 setcharAllowed((prev) => !prev)
                }}
                className="accent-purple-500"
              />
              <span>Characters</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
