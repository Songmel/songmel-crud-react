import styles from "./Boardlist.module.css";

function Boardlist({ navContents, mode, read }) {
  const navList = [];

  for (let i = 0; i < navContents.length; i++) {
    navList.push(
      <li key={navContents[i].id}>
        <a
          href={"/read/" + navContents[i].title}
          onClick={(event) => {
            event.preventDefault();
            mode("read");
            read(navContents[i].id);
          }}
        >
          {navContents[i].title}
        </a>
      </li>
    );
  }

  return (
    <nav className={styles.nav}>
      <ul>{navList}</ul>
    </nav>
  );
}

export default Boardlist;
