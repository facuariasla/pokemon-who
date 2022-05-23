import { useEffect, useState } from "react";
import api from "./api";
import { Pokemon } from "./types";
import FormGuess from "./components/FormGuess";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [hidePoke, setHidePoke] = useState<boolean>(true);
  const [inputPoke, setinputPoke] = useState<string>("");
  const [nextImg, setNextImg] = useState(true);
  const [truePoke, setTruePoke] = useState(false);
  const [counter, setCounter] = useState<number>(0);
  const [right, setRight] = useState(true);

  useEffect(() => {
    api.random().then((res) => setPokemon(res));
    setHidePoke(true);
    setTruePoke(false);
    setinputPoke("");
  }, [nextImg]);

  const handleChange = (event: React.ChangeEvent<Form>) => {
    event.preventDefault();

    if (!inputPoke.trim()) return;

    const inputFilter = inputPoke.toLocaleLowerCase().trim();
    console.log(inputFilter);

    // Si el valor introducido es igual al nombre de pokemon
    if (inputFilter === pokemon?.name) {
      setHidePoke(false);
      setTruePoke(true);
      setCounter(counter + 1);
      setRight(true);
    } else {
      setRight(false);
    }
  };

  const changeImg = () => {
    setNextImg(!nextImg);
    setRight(true);
  };

  return (
    <main>
      <div className="container">
        <header>
          <div className="score-data">Score: {counter}</div>
        </header>

        <div className="container-title">
          <h2>Who's that Pokemon!?</h2>
        </div>

        <div className="api-data">
          {pokemon ? (
            <div key={pokemon.id} className="api-data__img-btn">
              <div className="api-data_img">
                <img
                  src={pokemon.image}
                  className={hidePoke ? "whois" : ""}
                  unselectable="on"
                  alt="pokemon"
                />
              </div>
              <button
                type="button"
                onClick={() => setHidePoke(false)}
              >
                Show
              </button>
            </div>
          ) : (
            <>Loading...</>
          )}
          <div className="api-data_name-poke">
            {hidePoke ? (
              <>...</>
            ) : (
              <span className={truePoke ? "nes-text is-success" : "nes-text"}>
                It's {pokemon?.name}!
              </span>
            )}
          </div>
        </div>

        <FormGuess
          handleChange={handleChange}
          hidePoke={hidePoke}
          right={right}
          setInputPoke={(e: any) => setinputPoke(e.target.value)}
          inputVal={inputPoke}
          changeImg={()=>changeImg()}
        />
      </div>
    </main>
  );
}

export default App;
