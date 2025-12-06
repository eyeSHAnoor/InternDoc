# 🚀 Full-Stack Admin & Client Management System

A modern **Django REST API + React (Vite) frontend** application designed for managing users, clients, roles, authentication, and project revenue, with support for JWT tokens, avatars, and CORS.

---

## 📌 Features

### 🔐 **Authentication**

* JWT-based authentication using **SimpleJWT**
* Secure API endpoints
* Custom `User` model (UUID-based)

### 👥 **User Management**

* Custom `User` model with:

  * Name
  * Email
  * Avatar
  * Role system (Admin, Manager, User, Guest)
  * Firebase UID (optional)
  * Active/Inactive status
* Sortable & searchable admin panel

### 🧑‍💼 **Client Management**

* UUID-based `Client` model
* Avatar upload support
* Project name + revenue tracking
* Status system (Active, Inactive, Pending, Suspended)
* Linked to the user who invited the client
* Admin list filters and search

### 🖼 **Image Upload Support**

* Automatic media directory handling
* Avatar uploading for both Users & Clients

### 🧩 **Backend Structure**

* Django 6.0
* Django REST Framework
* CORS enabled for React frontend
* Clean settings file with static & media support
* Organized admin panel

---

## 🛠 Tech Stack

### **Backend**

* Django 6
* Django REST Framework
* SimpleJWT
* Pillow
* CORSHeaders
* SQLite (default)

### **Frontend**

* React (Vite)
* Tailwind CSS (optional)
* Axios / Fetch for API calls

---

## 📂 Project Structure

```
backend/
│── api/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   ├── admin.py
│── backend/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│── media/
│── static/
│── manage.py
frontend/
│── src/
│── package.json
│── vite.config.js
```

---

## ⚙️ Installation & Setup

### 📍 1. Clone the project

```
git clone <your-repo-url>
cd backend
```

---

## 📦 2. Create Virtual Environment & Install Dependencies

```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

If Pillow is missing:

```
pip install Pillow
```

Install SimpleJWT:

```
pip install djangorestframework-simplejwt
```

Install CORS:

```
pip install django-cors-headers
```

---

## 🗄 3. Run Migrations

```
python manage.py makemigrations
python manage.py migrate
```

---

## 👤 4. Create Superuser

```
python manage.py createsuperuser
```

---

## ▶ 5. Run The Server

```
python manage.py runserver
```

API will be available at:

```
http://127.0.0.1:8000/
```

---

# 🔗 Frontend Setup (React + Vite)

Navigate to your frontend folder:

```
cd frontend
npm install
npm run dev
```

Default frontend runs on:

```
http://localhost:5173/
```

---

# 🔑 Environment Variables (Optional)

Create a `.env` file in frontend:

```
VITE_API_URL=http://127.0.0.1:8000
```

---

# 🖼 Media & Avatar Support

Uploaded images are stored in:

```
/media/avatars/
/media/client_avatars/
```

Make sure MEDIA settings are correct:

```python
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

---

# 🔧 Admin Panel

Go to:

```
http://127.0.0.1:8000/admin/
```

Use the superuser credentials you created.

---

# ✔ Custom Admin Enhancements

* User list shows name, email, role, active status
* Client list shows project, revenue, status
* UUID fields are read-only
* Avatar fields supported
* Sorting by created_at

---

# 📜 License

This project is free to modify and use for personal, commercial, or educational purposes.

---

# 🤝 Contributing

Feel free to:

* Add new features
* Improve API security
* Add pagination, filtering, or role-based permissions

---

# 💬 Support

If you want help adding:

* JWT login API
* React login form
* Role-based dashboard
* Admin UI improvements
  Just ask!
