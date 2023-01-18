import { useState } from "react";

import "./App.css";
import Header from "./Header";
import Nav from "./Nav";
import Board from "./Board";

function App() {
  const [readContent, setReadContent] = useState(1);
  const [mode, setMode] = useState("read");

  const navContents = [
    {
      id: 111,
      title: "About",
      content:
        "Culpa minim reprehenderit officia officia ipsum. Ad dolore eiusmod nisi minim dolore labore magna anim consectetur mollit ea ex duis sunt. Eu in consequat magna tempor.",
    },
    {
      id: 222,
      title: "CRUD Board",
      content: <Board />,
    },
  ];

  let navContent = null;

  if (mode === "read") {
    for (let i = 0; i < navContents.length; i++) {
      if (navContents[i].id === readContent) {
        navContent = (
          <article className="main">
            <h2 className="main-title">{navContents[i].title}</h2>
            <div>{navContents[i].content}</div>
          </article>
        );
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <Nav
        navContents={navContents}
        mode={(_mode) => {
          setMode(_mode);
        }}
        read={(_id) => {
          setReadContent(_id);
        }}
      />
      {navContent}
    </div>
  );
}

export default App;
