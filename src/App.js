import { useState } from "react";

import "./App.css";

function Header() {
  return (
    <header>
      <h1>
        <a href="/">Songmel CRUD</a>
        <span>with react & vanila CSS</span>
      </h1>
    </header>
  );
}

function Nav({ navContents, mode, read }) {
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
    <nav>
      <ul>{navList}</ul>
    </nav>
  );
}

function Board() {
  const [mode, setMode] = useState("read");
  const [readContent, setReadContent] = useState(1);

  let contentShower = null;

  const firstContents = [
    {
      id: 1,
      title: "It's my first React CRUD project.",
      content:
        "Culpa minim reprehenderit officia officia ipsum. Ad dolore eiusmod nisi minim dolore labore magna anim consectetur mollit ea ex duis sunt. Eu in consequat magna tempor.",
    },
    {
      id: 2,
      title: "I want to good at react.js",
      content:
        "Cillum ad est ullamco dolore elit consequat aliqua consectetur ut. Occaecat laboris aliquip ex laborum esse veniam ullamco pariatur elit officia dolor. Commodo quis ea laboris exercitation. Minim est nisi pariatur elit ex adipisicing aliqua et aute aliquip. Aute in cupidatat proident veniam incididunt.",
    },
  ];
  const [contents, setContents] = useState(firstContents);

  //Create
  function Create({ onCreate }) {
    return (
      <article>
        <h2>Add your new post!</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const title = event.target.title.value;
            const body = event.target.body.value;
            onCreate(title, body);
            setMode("read");
          }}
        >
          <input name="title" type="text" placeholder="title" />
          <textarea name="body" placeholder="body" />
          <input type="submit" value="submit" />
        </form>
      </article>
    );
  }

  //Read
  function Read({ contents }) {
    for (let i = 0; i < contents.length; i++) {
      if (contents[i].id === readContent) {
        return (
          <article>
            <h2>{contents[i].title}</h2>
            <div>{contents[i].content}</div>
            <button
              onClick={() => {
                setMode("update");
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                setMode("delete");
              }}
            >
              Delete
            </button>
          </article>
        );
      }
    }
  }

  //Update
  function Update({ onUpdate }) {
    const [title, setTitle] = useState(contents[readContent - 1].title);
    const [body, setBody] = useState(contents[readContent - 1].content);
    return (
      <article>
        <h2>Update your new post!</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const title = event.target.title.value;
            const body = event.target.body.value;
            onUpdate(title, body);
            setMode("read");
          }}
        >
          <input
            name="title"
            type="text"
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
          <input type="submit" value="submit" />
        </form>
      </article>
    );
  }

  //Delete
  function remove() {
    const tempContents = [...contents];
    tempContents.splice(readContent - 1, 1);
    for (let i = 0; i < tempContents; i++) {
      tempContents[i].id = i + 1;
    }
    setContents(tempContents);
    setReadContent(() => readContent - 1);
    setMode("read");
    console.log(contents, readContent);
  }

  //mode selecter
  if (mode === "read") {
    contentShower = <Read contents={contents} />;
  } else if (mode === "create") {
    contentShower = (
      <Create
        onCreate={(_title, _body) => {
          const newContent = {
            id: contents[contents.length - 1].id + 1,
            title: _title,
            content: _body,
          };
          const tempContents = [...contents];
          tempContents.push(newContent);
          setContents(tempContents);
        }}
      />
    );
  } else if (mode === "update") {
    contentShower = (
      <Update
        onUpdate={(_title, _body) => {
          const newContent = {
            id: readContent,
            title: _title,
            content: _body,
          };
          const tempContents = [...contents];
          tempContents.splice(readContent - 1, 1, newContent);
          setContents(tempContents);
        }}
      />
    );
  } else if (mode === "delete") {
    remove();
  }

  return (
    <div>
      <button
        onClick={() => {
          setMode("create");
        }}
      >
        Create
      </button>
      <Nav
        navContents={contents}
        mode={(_mode) => {
          setMode(_mode);
        }}
        read={(_id) => {
          setReadContent(_id);
        }}
      />
      {contentShower}
    </div>
  );
}

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
          <article>
            <h2>{navContents[i].title}</h2>
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
