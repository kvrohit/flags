import { useEffect, useRef, useState } from "react";
import Flag from "./components/Flag";
import Header from "./components/Header";
import { getFlags, getRandomInt } from "./utils.js";

function pickRandomFlag(flags) {
  return flags[getRandomInt(0, flags.length - 1)];
}

function App() {
  const [flags, setFlags] = useState(getFlags());
  const [answer, setAnswer] = useState(pickRandomFlag(flags));
  const [disabled, setDisabled] = useState(false);
  const [count, setCount] = useState(0);

  const audioRef = useRef();

  useEffect(() => {
    setAnswer(pickRandomFlag(flags));
    audioRef.current.play();
  }, [flags]);

  useEffect(() => {
    const id = setTimeout(() => {
      setCount(count - 1);
    }, 1 * 1000);

    if (count === 0) {
      clearTimeout(id);
    }
  }, [count]);

  function next() {
    setDisabled(true);
    setCount(3);

    setTimeout(() => {
      setFlags(getFlags());
      setDisabled(false);
    }, 3 * 1000);
  }

  return (
    <>
      <Header count={count} />
      <div className="px-8 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {flags.map((flag) => (
            <div key={flag.iso_country_code}>
              <Flag
                key={flag.iso_country_code}
                isoCountryCode={flag.iso_country_code}
                countryName={flag.country_name}
                answer={answer}
                disabled={disabled}
                next={next}
              />
            </div>
          ))}
        </div>
        <span className="inline-block my-10 bg-white p-4 rounded-lg space-y-0.5 shadow">
          <p className="text-xs text-zinc-500">Identify</p>
          <p
            className="text-xl sm:text-2xl pr-12 sm:pr-28"
            onClick={() => audioRef.current.play()}
          >
            {answer.country_name}
          </p>
        </span>
      </div>
      <audio
        autoPlay={true}
        src={`/audio/${answer.iso_country_code}.wav`}
        ref={audioRef}
      />
    </>
  );
}

export default App;
