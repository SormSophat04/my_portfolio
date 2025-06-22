import React, { useState, useEffect, useRef } from "react";
import {
  Download,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Code,
  Rocket,
} from "lucide-react";

// Custom hook for intersection observer - remains the same, it's a great utility
type UseIntersectReturn<T extends HTMLElement> = [React.RefObject<T | null>, boolean];

const useIntersect = <T extends HTMLElement>(options: IntersectionObserverInit): UseIntersectReturn<T> => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [ref, options]);

  return [ref, isIntersecting];
};

// New Timeline Item Component for the journey section
type TimelineItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
};

const TimelineItem: React.FC<TimelineItemProps> = ({ icon, title, description, isLast }) => {
  const [ref, isVisible] = useIntersect<HTMLDivElement>({ threshold: 0.5 });
  return (
    <div ref={ref} className="flex items-start">
      <div className="flex flex-col items-center mr-6">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 border-2 border-blue-500 transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          {icon}
        </div>
        {!isLast && <div className="w-0.5 h-24 bg-gray-700 mt-2"></div>}
      </div>
      <div
        className={`transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
      >
        <h4 className="text-xl font-bold text-blue-400 mb-1">{title}</h4>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

function About() {
  const [heroRef, heroVisible] = useIntersect<HTMLDivElement>({ threshold: 0.2 });
  const [textRef, textVisible] = useIntersect<HTMLDivElement>({ threshold: 0.2 });
  const [statsRef, statsVisible] = useIntersect<HTMLDivElement>({ threshold: 0.5 });
  const [ctaRef, ctaVisible] = useIntersect<HTMLDivElement>({ threshold: 0.8 });

  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "15+", label: "Projects Completed" },
    { value: "5+", label: "Core Technologies" },
  ];

  const timelineData = [
    {
      icon: <Sparkles className="text-blue-400" size={24} />,
      title: "The Spark",
      description:
        "Began my coding journey with a fascination for building things for the web.",
    },
    {
      icon: <GraduationCap className="text-blue-400" size={24} />,
      title: "Formal Education",
      description:
        "Graduated with a degree in Computer Science, building a strong foundation.",
    },
    {
      icon: <Code className="text-blue-400" size={24} />,
      title: "First Major Project",
      description:
        "Developed a full-stack application, turning theory into practice.",
    },
    {
      icon: <Rocket className="text-blue-400" size={24} />,
      title: "Continuous Growth",
      description:
        "Currently exploring advanced concepts in AI and system architecture.",
      isLast: true,
    },
  ];

  return (
    <div
      id="about"
      className="relative min-h-screen bg-gray-900 text-white pt-20 pb-24 overflow-hidden"
    >
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 -left-16 w-96 h-96 bg-blue-900/50 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-1/4 -right-16 w-96 h-96 bg-cyan-900/50 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-3000"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">
            My Journey
          </h2>
        </div>

        {/* Hero Image Section */}
        <div
          ref={heroRef}
          className={`relative mb-16 transition-all duration-1000 ${
            heroVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden p-2 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl">
            <img
              src="https://placehold.co/400x400/1a202c/38bdf8?text=Dev"
              alt="A passionate developer"
              className="rounded-full w-full h-full object-cover border-4 border-gray-800"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.onerror = null;
                img.src =
                  "https://placehold.co/400x400/1a202c/ffffff?text=Image+Missing";
              }}
            />
          </div>
        </div>

        {/* Text Content Section */}
        <div
          ref={textRef}
          className={`max-w-3xl text-center transition-all duration-1000 delay-200 ${
            textVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            From Curiosity to Creation
          </h3>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            My path in technology has been a continuous adventure, driven by an
            insatiable curiosity for how things work. I believe in the power of
            code to solve real-world problems and to craft beautiful, intuitive
            digital experiences. Every project is a new opportunity to learn,
            innovate, and push the boundaries of what's possible.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="max-w-xl w-full my-12">
          {timelineData.map((item, index) => (
            <TimelineItem key={index} {...item} />
          ))}
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className={`flex justify-center space-x-8 md:space-x-16 my-12 transition-opacity duration-1000 ${
            statsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                statsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <p className="text-4xl font-bold text-blue-400">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className={`flex justify-center space-x-4 transition-opacity duration-1000 delay-300 ${
            ctaVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href="#contact"
            className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300"
          >
            <span>Get In Touch</span>
            <ArrowRight className="ml-2" size={20} />
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
          >
            <Download className="mr-2" size={20} />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
