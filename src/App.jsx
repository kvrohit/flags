import {
  createSignal,
  createEffect,
  createMemo,
  onCleanup,
  For,
} from "solid-js";
import Flag from "./components/Flag";
import Header from "./components/Header";
import { getFlags, getRandomInt } from "./utils.js";

function pickRandomFlag(flags) {
  return flags[getRandomInt(0, flags.length - 1)];
}

function App() {
  const [flags, setFlags] = createSignal(getFlags());
  const [disabled, setDisabled] = createSignal(false);
  const [count, setCount] = createSignal(0);

  const answer = createMemo(() => pickRandomFlag(flags()));

  let timer, countdownTimer;

  function next() {
    setDisabled(true);
    setCount(3);

    countdownTimer = setInterval(() => {
      setCount((count) => {
        if (count === 1) {
          clearInterval(countdownTimer);
        }

        return count - 1;
      });
    }, 1 * 1000);

    timer = setTimeout(() => {
      setFlags(() => {
        setDisabled(false);
        return getFlags();
      });
    }, 3 * 1000);
  }

  onCleanup(() => {
    clearTimeout(timer);
    clearInterval(countdownTimer);
  });

  return (
    <>
      <Header count={count()} />
      <div className="px-8 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <For each={flags()}>
            {(flag) => (
              <Flag
                isoCountryCode={flag.iso_country_code}
                countryName={flag.country_name}
                answer={answer()}
                disabled={disabled()}
                next={next}
              />
            )}
          </For>
        </div>
        <span className="inline-block my-10 bg-white p-4 rounded-lg space-y-0.5 shadow">
          <p className="text-xs text-zinc-500">Identify</p>
          <p
            className="text-xl sm:text-2xl pr-12 sm:pr-28"
            onClick={() => audioRef.current.play()}
          >
            {answer().country_name}
          </p>
        </span>
      </div>
      {/* <audio
        autoPlay={true}
        src={`/audio/${answer().iso_country_code}.wav`}
      ref={audioRef}
      /> */}
    </>
  );
}

export default App;
