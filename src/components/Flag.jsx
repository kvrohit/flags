import { useEffect, useState } from "react";

export default function Flag({
  isoCountryCode,
  countryName,
  answer,
  disabled,
  next,
}) {
  const [result, setResult] = useState("none");

  useEffect(() => {
    setResult("none");
  }, [answer]);

  function handleClick(e) {
    if (isoCountryCode === answer.iso_country_code) {
      setResult("correct");
    } else {
      setResult("incorrect");
    }

    next();
  }

  return (
    <div
      className={`relative hover:scale-105 transition-transform cursor-pointer shadow-lg ${
        disabled ? "pointer-events-none" : "pointer-events-auto"
      }`}
      onClick={handleClick}
    >
      <img
        className="rounded-md"
        src={`/svg/${isoCountryCode}.svg`}
        width="100%"
        height="100%"
        alt="Flag of a country"
      />
      {result === "none" ? null : (
        <div
          className={`rounded-md absolute inset-0 flex items-center justify-center text-white ${
            result === "correct" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {result === "correct" ? (
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
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
}
