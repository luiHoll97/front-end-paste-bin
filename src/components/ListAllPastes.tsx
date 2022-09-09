import { useEffect, useState } from "react";
import ShowMoreText from "react-show-more-text";

interface IPaste {
  paste_id: number;
  snippet: string;
  owner: string;
  posted: string;
}

interface todoHooks {
  internalTodos: any[];
  setInternalTodo: React.Dispatch<React.SetStateAction<any[]>>;
}

const ListAllPastes = ({
  internalTodos,
  setInternalTodo,
}: todoHooks): JSX.Element => {
  const [allPastes, setAllPastes] = useState<IPaste[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllPastes();
  }, [internalTodos]);

  useEffect(() => {
    setInternalTodo(allPastes);
  }, [allPastes]);

  const deletePaste = async (id: number) => {
    try {
      const response = await fetch(
        `https://a2-paste-bin.herokuapp.com/pastes/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(response.json());
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

  const formatDate = (date: string): string => {
    const firstString = date.substring(0, date.indexOf("T"));
    const secondString = date.substring(
      date.indexOf("T") + 1,
      date.indexOf(".")
    );
    return firstString + ", " + secondString;
  };

  const allPastesList = allPastes.map((paste: IPaste) => {
    return (
      <div key={paste.paste_id} className="snippetBlock">
        <h3 className="snippetHeader">owner:</h3>
        <p>{paste.owner}</p>
        <h3 className="snippetHeader">snippet:</h3>
        <ShowMoreText
          /* Default options */
          lines={5}
          more="Show more"
          less="...Show less"
          anchorClass="oooeeer"
          onClick={() => setShow(!show)}
          expanded={show}
          width={0}
        >
          {paste.snippet}
        </ShowMoreText>
        <p>{formatDate(paste.posted)}</p>
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
};

export default ListAllPastes;
