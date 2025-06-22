import React, { useState, useEffect } from "react";
import appleStore from "../assets/apple_store.png";
import posLaravel from "../assets/laravel_pos1.png";
import moVie from "../assets/movie.png";
import coffeeShop from "../assets/coffee_shop.png";

// --- SVG Icon for GitHub ---
const GithubIcon = ({ size = 24, className = "" }) => (
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

// --- Reusable Project Card Component ---
type ProjectCardProps = {
    title: string;
    description: string;
    imageUrl: string;
    githubUrl: string;
    deployUrl: string;
  };
  
  const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, githubUrl, deployUrl }) => {
    const [isLoaded, setIsLoaded] = useState(false);
  
    // Trigger animation after component mounts
    useEffect(() => {
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div
        className={`transform transition-all duration-500 ease-out 
                    ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300 group h-full flex flex-col">
          {/* The image is now a clickable link to the deployed site */}
          <a href={deployUrl} target="_blank" rel="noopener noreferrer" className="relative block overflow-hidden">
              <img
                  src={imageUrl}
                  alt={`Screenshot of ${title}`}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/600x400/FF0000/FFFFFF?text=Image+Error";
                  }}
              />
              <div className="absolute inset-0  bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <p className="text-white text-lg font-bold bg-cyan-400 bg-opacity-70 rounded-full px-4 py-2">
                      View Live Site
                  </p>
              </div>
          </a>
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-base flex-grow">{description}</p>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300"
              >
                <GithubIcon className="mr-2" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

// --- Main Project Section Component ---
function Project() {
  const projects = [
    {
      title: "E-Commerce Electronics Store",
      description:
        "A full-stack e-commerce application built with React and Node.js",
      imageUrl: appleStore,
      githubUrl: "https://github.com/SormSophat04/etectronic_store.git",
      deployUrl: "https://miniaps.netlify.app/",
    },
    {
      title: "POS System",
      description:
        "A point-of-sale system built with Laravel, providing a robust backend for managing sales and inventory.Cashier: name: Messi, password: 123 Admin: name: Admin, password: ***",
      imageUrl: posLaravel,
      githubUrl: "https://github.com/SormSophat04/pos_laravel.git",
      deployUrl: "https://pos-electronic.laravel.cloud/",
    },
    {
      title: "Movie App",
      description:
        "A movie application built with React, showcasing movie listings and details.",
      imageUrl: moVie,
      githubUrl: "https://github.com/SormSophat04/Movie.git",
      deployUrl: "https://khmermovie.netlify.app/",
    },
    {
      title: "Coffee Shop",
      description:
        "A coffee shop website built with React and Tailwind CSS, featuring a menu and online ordering.",
      imageUrl: coffeeShop,
      githubUrl: "https://github.com/SormSophat04/coffee_corner.git",
      deployUrl: "https://coffee-cornerr.netlify.app/",
    },
  ];

  return (
    <div
      id="project"
      className="min-h-screen bg-gray-900 pt-20 pb-20 text-center text-white px-4"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Past Project Experience
        </h2>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Here are some of the projects I've worked on. Feel free to explore
          them on GitHub.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              githubUrl={project.githubUrl}
              deployUrl={project.deployUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project;
