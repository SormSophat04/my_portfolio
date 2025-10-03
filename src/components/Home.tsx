import React, { useState, useEffect } from "react";
import imagePF from "../assets/pf.png";

// A reusable Link component for smooth scrolling.
interface SmoothScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({
  href,
  children,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const target: Element | null = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

// The animated Home component
function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = React.useMemo(
    () => ["Sorm Sophat", "Mobile Developer", "Web Developer"],
    []
  );
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delay = 2000;

  // Effect for the typing animation
  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex % words.length];
      const updatedText = isDeleting
        ? currentWord.substring(0, typingText.length - 1)
        : currentWord.substring(0, typingText.length + 1);

      setTypingText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        // Pause at end of word
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setWordIndex(wordIndex + 1);
      }
    };

    const typingTimeout = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(typingTimeout);
  }, [
    typingText,
    isDeleting,
    wordIndex,
    words,
    delay,
    deletingSpeed,
    typingSpeed,
  ]);

  // Effect for the initial page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://placehold.co/1920x1080/2D3748/E2E8F0?text=Background+Image')'",
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left Column: Text Content with Animation */}
        <div
          className={`text-left md:w-1/2 transform transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-4 mt-18 ">
            Hi, I'm
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight shadow-text mb-4 md:h-26">
            {/* Typing animation happens here */}
            {typingText}
            <span className="text-cyan-400 animate-pulse">|</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300 shadow-text">
            I am a passionate developer with a love for creating beautiful and
            functional web applications.
          </p>
          <SmoothScrollLink
            href="#about"
            className="inline-block bg-cyan-500 text-white font-bold px-8 py-3 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Learn More
          </SmoothScrollLink>
        </div>

        {/* Right Column: Image with Animation */}
        <div
          className={`md:w-1/3 flex justify-center items-center transform transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
          style={{ transitionDelay: "200ms" }} // Stagger the animation
        >
          <img
            src={imagePF}
            alt="A professional headshot or relevant portfolio image"
            // Changed from rounded-full to rounded-2xl for a square shape
            className="rounded-2xl shadow-2xl object-cover w-64 h-64 md:w-80 md:h-120"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.onerror = null;
              img.src =
                "https://placehold.co/400x400/FF0000/FFFFFF?text=Image+Failed";
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
