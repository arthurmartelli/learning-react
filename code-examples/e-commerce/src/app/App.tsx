import "./App.scss";
import Logo from "@/assets/logo.svg";

function App() {
  return (
    <>
      <h1> Welcome! </h1>
      <img src={Logo} className="logo" alt="Logo" />
    </>
  );
}

export function sum(a: number, b: number) {
  return a + b;
}

export default App;
