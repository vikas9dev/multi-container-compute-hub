import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fib from "./Fib";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <NavLink to="/" className="nav-brand">
            🚀 <span>ComputeHub</span>
          </NavLink>
          <div className="nav-links">
            <NavLink exact to="/" className="nav-link" activeClassName="active">
              Calculator
            </NavLink>
            <NavLink
              to="/otherpage"
              className="nav-link"
              activeClassName="active"
            >
              Documentation
            </NavLink>
          </div>
        </nav>

        <main className="app-container fade-in">
          <header>
            <h1 className="page-title">Multi-Container Hub - K8s</h1>
            <p className="page-subtitle">
              A high-performance distributed task engine powered by Docker,
              Redis, and Postgres.
            </p>
          </header>

          <div className="content">
            <Route exact path="/" component={Fib} />
            <Route path="/otherpage" component={OtherPage} />
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
