import ListAllPastes from "./components/ListAllPastes";
import AddPaste from "./components/AddPaste";
import "./app.css";

function App(): JSX.Element {
  return (
    <>
      <h1>PASTEBIN TEST </h1>

      <AddPaste />
      <ListAllPastes />
    </>
  );
}

export default App;
