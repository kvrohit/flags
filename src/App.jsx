import {
  Column,
  Grid,
  Content,
  Header,
  HeaderName,
  Button,
  ClickableTile,
} from "@carbon/react";
import { useEffect, useRef, useState } from "react";
import Flag from "./components/Flag";
import { getFlags, getRandomInt } from "./utils.js";

function pickRandomFlag(flags) {
  return flags[getRandomInt(0, flags.length - 1)];
}

function App() {
  const [flags, setFlags] = useState(getFlags());
  const [answer, setAnswer] = useState(pickRandomFlag(flags));

  const audioRef = useRef();

  useEffect(() => {
    setAnswer(pickRandomFlag(flags));
    audioRef.current.play();
  }, [flags]);

  function reset() {
    setFlags(getFlags());
  }

  return (
    <>
      <Header>
        <HeaderName href="#" prefix="Country">
          Flags
        </HeaderName>
      </Header>
      <Content>
        <Grid>
          {flags.map((flag) => (
            <Column key={flag.iso_country_code} lg={5} sm={3}>
              <Flag
                key={flag.iso_country_code}
                isoCountryCode={flag.iso_country_code}
                countryName={flag.country_name}
                answer={answer}
                reset={reset}
              />
            </Column>
          ))}
        </Grid>
        <ClickableTile
          style={{ margin: "16px" }}
          onClick={() => audioRef.current.play()}
        >
          {answer.country_name}
        </ClickableTile>
        <audio
          autoPlay={true}
          src={`/audio/${answer.iso_country_code}.wav`}
          ref={audioRef}
        />
      </Content>
    </>
  );
}

export default App;
