import About from "./components/About"
import Header from "./components/Header"
import Home from "./components/Home"
import Project from "./components/Project"
import Skills from "./components/Skills"

function App() {
  return (
    <div className="bg-gray-800">
      <header>
        <Header />
      </header>
      <main>
        <Home />
        <About />
        <Skills />
        <Project />
      </main>
    </div>
  );
}

export default App
