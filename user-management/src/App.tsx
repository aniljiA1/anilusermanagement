import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreateUser from './pages/CreateUser'
import EditUser from './pages/EditUser'
import UserDetail from './pages/UserDetail'
import './App.css'


export default function App() {
return (
<div className="app">
<header className="header">
<div className="container">
<h1 className="logo"><Link to="/">User Management</Link></h1>
<nav>
<Link to="/">Home</Link>
<Link to="/create">Create</Link>
</nav>
</div>
</header>


<main className="container">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/create" element={<CreateUser />} />
<Route path="/edit/:id" element={<EditUser />} />
<Route path="/users/:id" element={<UserDetail />} />
</Routes>
</main>


<footer className="footer container">
<p>Built with React + TypeScript • JSONPlaceholder API</p>
</footer>
</div>
)
}
