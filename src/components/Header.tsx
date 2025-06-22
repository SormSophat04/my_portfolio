import React, { useState, useEffect } from "react";

type LinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const Link: React.FC<LinkProps> = ({ to, children, className, onClick }) => (
  <a href={to} className={className} onClick={onClick}>
    {children}
  </a>
);

// --- SVG Icons (Unchanged) ---
const GithubIcon = ({ size = 28, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);
const BarsIcon = ({ size = 28, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);
const TimesIcon = ({ size = 28, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const navLinks = React.useMemo(
    () => [
      { href: "#home", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#skills", label: "Skills" },
      { href: "#project", label: "Project" },
    ],
    []
  );

  // Effect for handling scroll events to change header style and active link
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let currentSectionId = "";
      const sections = navLinks.map((link) =>
        document.querySelector(link.href)
      );

      for (const section of sections) {
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop;
          if (window.scrollY >= sectionTop - 150) {
            currentSectionId = `#${section.id}`;
          }
        }
      }

      if (currentSectionId && currentSectionId !== activeLink) {
        setActiveLink(currentSectionId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeLink, navLinks]); // Re-run effect if activeLink or navLinks change

  // Function to handle smooth scrolling
  interface HandleNavClick {
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string): void;
  }

  const handleNavClick: HandleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Manually set active link on click for immediate feedback
      setActiveLink(href);
    }
    // Close mobile menu on link click
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    // Header now uses 'fixed' positioning and changes background based on 'scrolled' state
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="logo">
          <h1 className="text-3xl text-white font-bold tracking-wider hover:text-cyan-400 transition-colors duration-300">
            MyPortfolio
          </h1>
        </div>

        {/* Desktop Navigation with active link highlighting */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span
                className={`relative text-lg font-medium transition-colors duration-300 group ${
                  activeLink === link.href
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform transition-transform duration-300 ease-in-out ${
                    activeLink === link.href
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </span>
            </Link>
          ))}
        </nav>

        {/* Social Icon */}
        <div className="hidden md:block">
          <a
            href="https://github.com/SormSophat04"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-cyan-400 transition-transform duration-300 transform hover:scale-125"
          >
            <GithubIcon />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <TimesIcon /> : <BarsIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - with slide-down animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="px-8 pt-2 pb-4 flex flex-col space-y-4 bg-gray-900 bg-opacity-95">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span
                className={`block text-lg font-medium transition-colors duration-300 text-center py-2 rounded-lg ${
                  activeLink === link.href
                    ? "bg-cyan-400 text-gray-900"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <a
            href="https://github.com/SormSophat04"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-cyan-400 transition-transform duration-300 transform hover:scale-110 flex items-center justify-center space-x-2 pt-4"
          >
            <GithubIcon size={24} />
            <span>GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;