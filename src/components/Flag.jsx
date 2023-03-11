import { createSignal, createEffect, Show, Switch, Match } from "solid-js";

export default function Flag(props) {
  const [result, setResult] = createSignal("none");

  createEffect(() => {
    setResult("none");
  });

  function handleClick(e) {
    if (props.isoCountryCode === props.answer.iso_country_code) {
      setResult("correct");
    } else {
      setResult("incorrect");
    }

    props.next();
  }

  return (
    <div
      className={`relative hover:scale-105 transition-transform cursor-pointer shadow-lg ${
        props.disabled ? "pointer-events-none" : "pointer-events-auto"
      }`}
      onClick={handleClick}
    >
      <img
        className="rounded-md"
        src={`/svg/${props.isoCountryCode}.svg`}
        width="100%"
        height="100%"
        alt={props.countryName}
      />
      <Show when={result() !== "none"}>
        <div
          className={`rounded-md absolute inset-0 flex items-center justify-center text-white ${
            result() === "correct" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <Switch>
            <Match when={result() === "correct"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-2/3 h-2/3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Match>
            <Match when={result() === "incorrect"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-2/3 h-2/3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Match>
          </Switch>
        </div>
      </Show>
    </div>
  );
}
