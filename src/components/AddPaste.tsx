import { useState } from "react";

function AddPaste(): JSX.Element {
  const [snippet, setSnippet] = useState("");
  const [owner, setOwner] = useState("");

  // submit Paste onClick handler
  const submitPaste = async () => {
    try {
      const body = { snippet, owner };
      const addPaste = await fetch(
        `https://a2-paste-bin.herokuapp.com/pastes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(addPaste.json())
      setSnippet("");
      setOwner("");
      console.log(JSON.stringify(body));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Add a paste</h2>
      <input
        type="text"
        placeholder="type your snippet here"
        value={snippet}
        onChange={(e) => {
          setSnippet(e.target.value);
          console.log(snippet);
        }}
      />
      <input
        type="text"
        placeholder="what's your name?"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <button onClick={() => submitPaste()}>submit</button>
    </>
  );
}

export default AddPaste;
