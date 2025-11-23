import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Login from "./auth/Login";
import Register from "./auth/Register";

 import { usersData } from "./data/usersData";
import { postsData } from "./data/postsData";

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(usersData);
  const [posts, setPosts] = useState(postsData);

  const handleLogout = () => {
    setUser(null);
    alert("Logged out!");
  };

  return (
    <div className="App">
      <Router>
           <NavBar user={user} onLogout={handleLogout} />

          <Route path="/" exact>
            <Home user={user} />
          </Route>

          <Route path="/doctors" exact>
            <Doctors />
          </Route>

          <Route path="/dashboard" exact>
            <Dashboard user={user} posts={posts} setPosts={setPosts} />
          </Route>

          <Route path="/contact" exact>
            <Contact />
          </Route>

          <Route path="/login" exact>
            <Login users={users} setUser={setUser} />
          </Route>

          <Route path="/register" exact>
            <Register users={users} setUsers={setUsers} setUser={setUser} />
          </Route>

          <Footer />
       </Router>
    </div>
  );
}

export default App;
