import styles from "./Navbar.module.scss";
import Logo from "./Logo";

export default function Navbar({ sections }: { sections: string[] }) {
  return (
    <nav>
      <a href="#Home">
        <Logo width={"3rem"} height={"3rem"} />
      </a>
      {sections.map((section) => (
        <a href={"#" + section} className={styles.bordered}>
          {section}
        </a>
      ))}
    </nav>
  );
}
