import React, { useState, useEffect, useRef } from "react";
import imageProfile2 from "../assets/portfolio.png";
import {
  FaAndroid,
  FaBootstrap,
  FaC,
  FaDatabase,
  FaFlutter,
  FaJava,
  FaLaravel,
  FaNodeJs,
  FaReact,
} from "react-icons/fa6";

// Individual Skill Item Component
type SkillItemProps = {
  icon: React.ReactNode;
  name: string;
  level: number;
};

const SkillItem: React.FC<SkillItemProps> = ({ icon, name, level }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const currentRef = itemRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={itemRef} className="mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {icon}
          <h3 className="text-lg md:text-xl font-semibold ml-3">{name}</h3>
        </div>
        <span className="text-sm font-medium text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-cyan-400 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${level}%` : "0%" }}
        ></div>
      </div>
    </div>
  );
};

// Main Skills Component
function Skills() {
  const skillsData = [
    {
      name: "php & Laravel",
      level: 80,
      icon: <FaLaravel className="text-red-400" size={24} />,
    },
    {
      name: "Flutter & Dart",
      level: 70,
      icon: <FaFlutter className="text-blue-500" size={24} />,
    },
    {
      name: "React & Next.js",
      level: 60,
      icon: <FaReact className="text-cyan-400" size={24} />,
    },
    {
      name: "Java & Spring Boot",
      level: 40,
      icon: <FaJava className="text-red-400" size={26} />,
    },
    {
      name: "Node.js & Express",
      level: 40,
      icon: <FaNodeJs className="text-green-400" size={24} />,
    },
    {
      name: "Kotlin & Android",
      level: 30,
      icon: <FaAndroid className="text-green-400" size={24} />,
    },
    {
      name: "Databases (SQL & NoSQL)",
      level: 70,
      icon: <FaDatabase className="text-purple-400" size={24} />,
    },
    {
      name: "Tailwind & Bootstrap",
      level: 90,
      icon: <FaBootstrap className="text-blue-600" size={24} />,
    },
    {
      name: "C# & ASP.NET",
      level: 20,
      icon: <FaC className="text-red-400" size={24} />,
    },
  ];

  return (
    <div id="skills" className="min-h-screen pt-20 pb-24 text-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            My Technical Skills
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            A showcase of my expertise across various technologies, honed
            through practice and passion.
          </p>
        </div>

        {/* New section for image and description */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-20">
          {/* Left Column: Image */}
          <div className="w-full md:w-2/5 lg:w-1/4">
            <img
              src={imageProfile2}
              alt="A portrait of the developer"
              className="rounded-xl shadow-2xl shadow-cyan-500/20 w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  "https://placehold.co/400x400/1a202c/ffffff?text=Image+Not+Found";
              }}
            />
          </div>

          {/* Right Column: Description */}
          <div className="w-full md:w-3/5 lg:w-2/3 text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-400">
              My Learning Journey
            </h3>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed">
              My passion for technology began during my school years, where I
              first delved into the world of programming. This curiosity led me
              to pursue a formal education in computer science, building a
              strong theoretical foundation.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Throughout my academic career, I focused on practical application,
              participating in numerous projects that honed my skills in web
              development, database management, and algorithmic problem-solving.
              This blend of theory and hands-on experience is the bedrock upon
              which my current technical expertise is built.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {skillsData.map((skill) => (
            <SkillItem key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
