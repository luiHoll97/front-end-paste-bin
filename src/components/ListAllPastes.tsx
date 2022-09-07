import { useEffect, useState } from "react";

interface IPaste {
    paste_id: number,
    snippet: string,
    owner: string
}


function ListAllPastes():JSX.Element {

   const [allPastes, setAllPastes] = useState<IPaste[]>([]);
   
   useEffect(() => {
    getAllPastes()
    }, []
   )
    

   async function getAllPastes() {
    try {
        const response = await fetch("https://a2-paste-bin.herokuapp.com/pastes");
        const pasteJSON = await response.json()
        setAllPastes(pasteJSON);
    } catch (error) {
        console.log(error)
    }
    }

    const allPastesList = allPastes.map((paste: IPaste) => {
        return (<ul key={paste.paste_id}>
            <li>{paste.snippet}</li>
            <li>{paste.owner}</li>
        </ul>
        )
    } )
    
    return <>
    {allPastesList}
    </>

}

export default ListAllPastes;
