# 🚀 React + Laravel Blog Admin Panel

Admin Panel modern berbasis React sebagai frontend dan Laravel sebagai backend API. Didesain dengan tampilan yang bersih, interaktif, dan responsif, admin panel ini memberikan pengalaman seperti aplikasi desktop dalam mengelola konten blog.

## 📋 Deskripsi Proyek

Proyek ini bertujuan menyediakan antarmuka admin yang mudah digunakan untuk mengelola postingan blog. Frontend menangani UI/UX interaktif, sedangkan backend Laravel menyediakan API CRUD, authentication, dan data management.

## 🎯 Fitur Utama

### 🖥️ Frontend (React)

✔ **CRUD Operations** — Create, Read, Update, Delete posts  
✔ **Auto Refresh** — Data otomatis update setelah operasi CRUD  
✔ **Manual Refresh Button** — Tombol refresh untuk ambil data terbaru dari Laravel  
✔ **Skeleton Loading** — Animasi loading shimmer modern  
✔ **Responsive UI** — Optimal untuk desktop & mobile  
✔ **Delete Confirmation Dialog** — Pop-up konfirmasi sebelum hapus data  
✔ **Content Preview** — Preview konten dengan otomatis terpotong (truncate)

### 🛠️ Backend (Laravel API)

✔ **CRUD API** untuk manajemen postingan  
✔ **Authentication** (Sanctum/JWT)  
✔ **Validasi server-side**  
✔ **Struktur API yang clean dan RESTful**  
✔ **Laravel 12 dengan PHP 8.2**

## 🧩 Teknologi yang Digunakan

### Frontend
- **ReactJS (Vite)**
- **Axios**
- **React Router DOM**
- **TailwindCSS** / CSS Framework lain
- **SweetAlert** / Custom Modal

### Backend
- **Laravel 12**
- **PHP 8.2**
- **MySQL**
- **Laravel Sanctum** / JWT Auth

## 📁 Struktur Direktori (Frontend)

```
src/
├── components/
│   └── PostList.jsx
├── pages/
├── hooks/
├── services/
│   └── api.js
├── styles/
│   └── PostList.css
├── App.jsx
└── main.jsx
```

## ⚙️ Instalasi & Menjalankan Project

### 🔧 Frontend (React)

1. **Clone Repository**
```bash
git clone https://github.com/Mink76/laravel-react-frontend.git
cd laravel-react-frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Jalankan Development Server**
```bash
npm run dev
```

Frontend berjalan di: **http://localhost:5173**

### 🔌 Backend (Laravel)

Pastikan API Laravel sudah berjalan:
```bash
php artisan serve
```

Atur endpoint API pada: **`src/services/api.js`**

Contoh:
```javascript
export const API_URL = "http://localhost:8000/api";
```

## 🎨 UI Components

### PostList Component
Komponen utama untuk menampilkan dan mengelola daftar posts:

```jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch data dari Laravel API
  useEffect(() => {
    fetchPosts();
  }, []);
  
  return (
    <div>
      <h2>📄 Daftar Posts</h2>
      {/* Tabel data posts */}
    </div>
  );
};
```

## 🔄 Data Synchronization

### Auto Refresh (Setelah operasi dari React)
```javascript
// Hapus post - data langsung hilang tanpa refresh manual
const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
  setRefreshTrigger(prev => prev + 1); // Auto refresh
};
```

### Manual Refresh (Untuk perubahan dari Laravel)
```jsx
<button onClick={handleRefresh}>🔄 Refresh Data</button>
// Klik tombol untuk sync data dari Laravel
```

## 📊 API Endpoints (Laravel)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Ambil semua posts |
| GET | `/api/posts/{id}` | Ambil post spesifik |
| POST | `/api/posts` | Buat post baru |
| PUT | `/api/posts/{id}` | Update post |
| DELETE | `/api/posts/{id}` | Hapus post |

## 🎬 Demo Scenario

### Skenario 1: Tambah Post di Laravel
1. Buka Laravel admin/form
2. Buat post baru
3. Buka React admin
4. Klik tombol **Refresh Data**
5. Post baru muncul di tabel

### Skenario 2: Hapus Post dari React
1. Klik tombol **Hapus** di React
2. Konfirmasi dialog muncul
3. Setelah konfirmasi → data langsung hilang (auto refresh)

## 🚀 Deployment

### Deploy React (Frontend)
```bash
npm run build
# Upload folder 'dist' ke static hosting (Vercel, Netlify, etc.)
```

### Deploy Laravel (Backend)
```bash
# Production optimizations
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS Error | Pastikan `config/cors.php` di Laravel mengizinkan origin React |
| API Connection Failed | Cek apakah Laravel server berjalan (`php artisan serve`) |
| Data Tidak Muncul | Cek API response di `http://localhost:8000/api/posts` |
| React Tidak Update | Klik tombol **Refresh Data** untuk manual sync |

## 📚 Documentation

- [React Documentation](https://react.dev/)
- [Laravel Documentation](https://laravel.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Axios Documentation](https://axios-http.com/docs/intro)

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👤 Author

**Mink76** - [GitHub](https://github.com/Mink76)

---

### ✨ Highlights
- **Dua project terpisah** - React (frontend) dan Laravel (backend)
- **Real-time synchronization** dengan auto dan manual refresh
- **Modern UI** dengan skeleton loading dan responsive design
- **Easy to extend** untuk fitur tambahan

---
**Happy Coding!** 🚀