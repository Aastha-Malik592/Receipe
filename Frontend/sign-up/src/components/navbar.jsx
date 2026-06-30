import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/auth-slice";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = ({
  search,
  setSearch,
  category,
  setCategory,
  showFavorites,
  setShowFavorites,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>🍴 Recipe Manager</h2>

      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Dessert">Dessert</option>
      </select>

      <button
        className={showFavorites ? "active-btn" : ""}
        onClick={() => setShowFavorites(!showFavorites)}
      >
        ⭐ Favorites
      </button>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
