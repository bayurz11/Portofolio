import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import Link from 'next/link';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  const [currentPath, setCurrentPath] = useState<string>("");
  const [hasShadow, setHasShadow] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const sectionsRef = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    project: useRef<HTMLDivElement>(null),
    resume: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const initialPath = window.location.hash || "#Home";
    setCurrentPath(initialPath);

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      const isDark = savedMode === "true";
      setDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentPath(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    const observeElements = () => {
      Object.values(sectionsRef).forEach((ref) => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      });
    };

    setTimeout(observeElements, 0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || "#Home");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const isActive = (path: string) =>
    currentPath === path ? "text-blue-900 dark:text-white" : "text-gray-700 dark:text-gray-200";

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  return (
    <nav className={`bg-white dark:bg-gray-900 ${hasShadow ? 'shadow-md' : ''} w-full fixed top-0 left-0 z-50 transition-shadow duration-300`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="ml-2 font-semibold text-2xl dark:text-white">BAYU REZ</span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex space-x-9">
              {["Home", "About", "Education", "Project", "Resume", "Contact"].map((section) => (
                <Link key={section} href={`#${section}`} scroll={false}>
                  <span
                    className={`relative ${isActive(`#${section}`)} group`}
                    onClick={() => setCurrentPath(`#${section}`)}
                  >
                    <span className="flex items-center space-x-2 text-lg transition-colors duration-300">
                      {section === "Home" && "🚀"}
                      {section === "About" && "😎"}
                      {section === "Education" && "🎓"}
                      {section === "Project" && "⚒️"}
                      {section === "Resume" && "📑"}
                      {section === "Contact" && "📲"}
                      <span>{section}</span>
                      <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${currentPath === `#${section}` ? "scale-x-100" : ""}`}></span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Icon GitHub, Toggle Dark Mode, LinkedIn */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://id.linkedin.com/in/nur-azani-bayu-rezki-08369a219" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-600 hover:scale-105">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/bayurz11" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-400 hover:scale-105">
              <FaGithub size={24} />
            </a>
            <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-200">
              {darkMode ? <BsFillSunFill size={24} className="text-yellow-500" /> : <BsMoonStarsFill size={20} className="text-gray-700 dark:text-gray-200" />}
            </button>
          </div>

          {/* Tombol Menu Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path className={`${isOpen ? "hidden" : "inline-flex"}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                <path className={`${isOpen ? "inline-flex" : "hidden"}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
          {["Home", "About", "Education", "Project", "Resume", "Contact"].map((section) => (
            <Link key={section} href={`#${section}`} scroll={false}>
              <span
                className={`block px-3 py-2 rounded-md text-lg font-medium ${isActive(`#${section}`)}`}
                onClick={() => {
                  setCurrentPath(`#${section}`);
                  setIsOpen(false); // Close the mobile menu after clicking
                }}
              >
                {section === "Home" && "🚀"}
                {section === "About" && "😎"}
                {section === "Education" && "🎓"}
                {section === "Project" && "⚒️"}
                {section === "Resume" && "📑"}
                {section === "Contact" && "📲"}
                {section}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
