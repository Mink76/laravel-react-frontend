import { useState, useEffect } from "react";
import api from "../api/axios";
import "../styles/PostForm.css"; // Import CSS modern

export default function PostForm({ onBack }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category_id: "",
    user_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchUsers();
  }, []);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/posts", form);

    alert("Post berhasil dibuat!");
    onBack();
  };

  return (
    <div className="postform-container">
      <h2 className="postform-title">📝 Tambah Post</h2>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        {/* JUDUL */}
        <label className="postform-label">Judul Posts:</label>
        <input
          type="text"
          className="postform-input"
          placeholder="Judul"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <br /><br />

        {/* USER DROPDOWN */}
        <label className="postform-label">Pilih Penulis:</label>
        <select
          className="postform-select"
          value={form.user_id}
          onChange={(e) => setForm({ ...form, user_id: e.target.value })}
        >
          <option value="">-- Pilih Penulis --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <br /><br />

        {/* CATEGORY DROPDOWN */}
        <label className="postform-label">Pilih Kategori:</label>
        <select
          className="postform-select"
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        >
          <option value="">-- Pilih Kategori --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <br /><br />

        {/* CONTENT */}
        <label className="postform-label">Content:</label>
        <textarea
          className="postform-textarea"
          placeholder="Isi Post"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        ></textarea>

        <br />

        {/* BUTTONS */}
        <div className="postform-btn-container">
          <button
            type="button"
            onClick={onBack}
            className="postform-btn-cancel"
          >
            Cancel
          </button>

          <button type="submit" className="postform-btn-submit">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
