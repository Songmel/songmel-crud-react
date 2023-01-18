import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.headerBox}>
      <h1 className={styles.title}>
        <a href="/">Songmel CRUD</a>
      </h1>
      <span className={styles.subTitle}>with react & CSS Module</span>
    </header>
  );
}

export default Header;
