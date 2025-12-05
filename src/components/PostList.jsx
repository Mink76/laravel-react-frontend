import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/PostList.css";

export default function PostList({ onEdit, onCreate }) {
  const [posts, setPosts] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/posts");
      // Tambah sedikit delay untuk demo loading yang lebih smooth
      await new Promise(resolve => setTimeout(resolve, 300));
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Gagal memuat data posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger]);

  const deletePost = async (id) => {
    if (!window.confirm("Yakin ingin menghapus?")) return;

    try {
      await api.delete(`/posts/${id}`);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Gagal menghapus post");
    }
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Fungsi untuk render skeleton loading
  const renderSkeleton = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <tr key={`skeleton-${index}`}>
        <td><div className="skeleton skeleton-id"></div></td>
        <td><div className="skeleton skeleton-text"></div></td>
        <td><div className="skeleton skeleton-text"></div></td>
        <td><div className="skeleton skeleton-text"></div></td>
        <td><div className="skeleton skeleton-content"></div></td>
        <td>
          <div className="skeleton-buttons">
            <div className="skeleton skeleton-btn"></div>
            <div className="skeleton skeleton-btn"></div>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="postlist-container">
      <div className="postlist-header">
        <h2>📄 Daftar Posts</h2>
        <div className="postlist-actions">
          <button 
            className="postlist-refresh-btn" 
            onClick={handleRefresh}
            disabled={loading}
            title="Refresh data dari server"
          >
            {loading ? "🔄 Loading..." : "🔄 Refresh Data"}
          </button>
          <button 
            className="postlist-add-btn" 
            onClick={onCreate}
            disabled={loading}
          >
            + Tambah Post
          </button>
        </div>
      </div>

      {posts.length === 0 && !loading ? (
        <div className="empty-state">
          <p>Tidak ada posts ditemukan.</p>
          <button onClick={onCreate}>Buat Post Pertama</button>
        </div>
      ) : (
        <table className="postlist-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Judul</th>
              <th>Penulis</th>
              <th>Kategori</th>
              <th>Content</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              renderSkeleton()
            ) : (
              posts.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.title}</td>
                  <td>{p.user?.name || "Unknown"}</td>
                  <td>{p.category?.name || "Uncategorized"}</td>
                  <td className="content-preview">
                    {p.content?.length > 80
                      ? p.content.substring(0, 80) + "..."
                      : p.content || "No content"}
                  </td>

                  <td className="action-buttons">
                    <button 
                      className="btn-edit" 
                      onClick={() => onEdit(p)}
                      disabled={loading}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => deletePost(p.id)}
                      disabled={loading}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}