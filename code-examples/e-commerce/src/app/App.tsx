import "./App.scss";
import Logo from "@/components/Logo";

import Navbar from "@/components/Navbar";

export default function App() {
  const sections = ["About", "Services", "Contact"];

  return (
    <>
      <Navbar sections={sections} />
      <h1 className="title">
        <Logo /> Sintonia
      </h1>
    </>
  );
}
