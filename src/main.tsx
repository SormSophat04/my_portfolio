import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/skills" element={<h1>Skills Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
        </Route>
        <Route path="/*" element={<h1>Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
