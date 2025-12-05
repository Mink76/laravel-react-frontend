import { useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostEdit from "./components/PostEdit";
import "./App.css"; // pastikan ini ada

function App() {
  const [page, setPage] = useState("list");
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="container">
      <h1 className="title">React + Laravel Blog CRUD</h1>

      {page === "list" && (
        <PostList
          onCreate={() => setPage("create")}
          onEdit={(post) => {
            setSelectedPost(post);
            setPage("edit");
          }}
        />
      )}

      {page === "create" && <PostForm onBack={() => setPage("list")} />}

      {page === "edit" && (
        <PostEdit data={selectedPost} onBack={() => setPage("list")} />
      )}
    </div>
  );
}

export default App;
