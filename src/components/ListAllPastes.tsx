import { useEffect, useState } from "react";

interface IPaste {
  paste_id: number;
  snippet: string;
  owner: string;
}

function ListAllPastes(): JSX.Element {
  const [allPastes, setAllPastes] = useState<IPaste[]>([]);

  useEffect(() => {
    getAllPastes();
  }, []);

  const deletePaste = async (id: number) => {
    try {
      const response = await fetch(
        `https://a2-paste-bin.herokuapp.com/pastes/${id}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  async function getAllPastes() {
    try {
      const response = await fetch("https://a2-paste-bin.herokuapp.com/pastes");
      const pasteJSON = await response.json();
      setAllPastes(pasteJSON);
    } catch (error) {
      console.log(error);
    }
  }

  const allPastesList = allPastes.map((paste: IPaste) => {
    return (
      <div key={paste.paste_id} className="snippetBlock">
        <h3 className="snippetHeader">owner:</h3>
        <p>{paste.owner}</p>
        <h3 className="snippetHeader">snippet:</h3>
        <p>{paste.snippet}</p>
        <button onClick={() => deletePaste(paste.paste_id)}>delete</button>
        <button>edit</button>
      </div>
    );
  });

  return (
    <>
      <h2>Pastes</h2>
      {allPastesList}
    </>
  );
}

export default ListAllPastes;
