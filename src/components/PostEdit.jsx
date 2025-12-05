import { useState, useEffect } from "react";
import api from "../api/axios";
import "../styles/PostEdit.css";

export default function PostEdit({ data, onBack }) {
  const [form, setForm] = useState({
    title: data.title,
    content: data.content,
    category_id: data.category_id,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.put(`/posts/${data.id}`, form);

    alert("Post berhasil diperbarui!");
    onBack();
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2 className="edit-title">✏️ Edit Post</h2>

        <form onSubmit={handleSubmit} className="edit-form">

          {/* Judul */}
          <label>Judul</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          {/* Kategori */}
          <label>Kategori</label>
          <select
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

          {/* Konten */}
          <label>Konten</label>
          <textarea
            rows={5}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          {/* Buttons */}
          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={onBack}>
              Cancel
            </button>

            <button type="submit" className="update-btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
