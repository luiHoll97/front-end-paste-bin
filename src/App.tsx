import { useState } from "react";
import ListAllPastes from "./components/ListAllPastes";
import AddPaste from "./components/AddPaste";
import InternalHook from "./utils/InternalHook";

import "./app.css";

function App(): JSX.Element {
  const [internalTodos, setInternalTodo] = useState<InternalHook[]>([]);

  return (
    <>
      <h1>PASTEBIN TEST </h1>

      <AddPaste
        internalTodos={internalTodos}
        setInternalTodo={setInternalTodo}
      />
      <ListAllPastes
        internalTodos={internalTodos}
        setInternalTodo={setInternalTodo}
      />
    </>
  );
}

export default App;
