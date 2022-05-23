import React from "react";
interface Props {
  handleChange: any
  hidePoke: any
  right: any
  setInputPoke: any
  inputVal: any
  changeImg: any
}

 const FormGuess: React.FC<Props> = ({ handleChange, hidePoke, right, setInputPoke, inputVal, changeImg }) => {
  return (
    <form onSubmit={handleChange} autoComplete="off" className="guess-form">
        <input
          name="text"
          type="text"
          id="name_field"
          className={right ? "nes-input" : "nes-input is-error"}
          autoFocus
          onChange={setInputPoke}
          disabled={hidePoke ? false : true}
          style={{ background: "#AFDBF8", textAlign: "center" }}
          value={inputVal}
        />
      <button type="submit" className="nes-btn is-warning">
        Send
      </button>
      <button
          type="button"
          className="nes-btn is-primary"
          onClick={changeImg}
        >
          Next Pokemon
        </button>
    </form>
  );
};

export default FormGuess