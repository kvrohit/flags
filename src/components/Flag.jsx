import { useEffect, useState } from "react";
import styles from "./Flag.module.scss";

export default function Flag({
  isoCountryCode,
  countryName,
  reset,
  answer,
  disabled,
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

    reset();
  }

  return (
    <div
      className={`${styles.flag} ${disabled ? styles.disabled : null}`}
      onClick={handleClick}
    >
      <img
        src={`/svg/${isoCountryCode}.svg`}
        width="100%"
        height="100%"
        alt={countryName}
      />
      {result === "none" ? null : (
        <div className={`${styles.result} ${styles[result]}`}>
          {result === "correct" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="80%"
              height="80%"
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
              width="80%"
              height="80%"
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
