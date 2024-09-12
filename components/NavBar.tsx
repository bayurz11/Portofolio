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

  // Referensi untuk elemen dengan ID
  const sectionsRef = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    project: useRef<HTMLDivElement>(null),
    resume: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    // Mengatur path saat ini
    const initialPath = window.location.hash || "#Home";
    setCurrentPath(initialPath);

    // Menambahkan event listener untuk shadow pada navbar saat scroll
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Mengecek preferensi dark mode dari localStorage
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      const isDark = savedMode === "true";
      setDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    }

    // Implementasikan IntersectionObserver
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

    // Pastikan elemen sudah ada di DOM sebelum mengobservasi
    const observeElements = () => {
      Object.values(sectionsRef).forEach((ref) => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      });
    };

    // Observasi setelah rendering
    setTimeout(observeElements, 0);

    // Membersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Update currentPath when hash changes
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
    
    // Set atau hapus kelas dark berdasarkan mode yang baru
    document.documentElement.classList.toggle("dark", newDarkMode);
    
    // Simpan status mode gelap ke localStorage
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
              <Link href="#Home">
                <span
                  className={`relative ${isActive("#Home")} group`}
                  onClick={() => setCurrentPath("#Home")}
                >
                  <span className="flex items-center space-x-2 text-lg transition-colors duration-300">
                    🚀 <span>Home</span>
                    <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${currentPath === "#Home" ? "scale-x-100" : ""}`}></span>
                  </span>
                </span>
              </Link>
              <Link href="#About">
                <span
                  className={`relative ${isActive("#About")} group`}
                  onClick={() => setCurrentPath("#About")}
                >
                  <span className="flex items-center space-x-2 text-lg transition-colors duration-300">
                    😎 <span>About</span>
                    <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${currentPath === "#About" ? "scale-x-100" : ""}`}></span>
                  </span>
                </span>
              </Link>
              <Link href="#Education">
                <span
                  className={`relative ${isActive("#Education")} group`}
                  onClick={() => setCurrentPath("#Education")}
                >
                  <span className="flex items-center space-x-2 text-lg transition-colors duration-300">
                    🎓 <span>Education</span>
                    <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${currentPath === "#Education" ? "scale-x-100" : ""}`}></span>
                  </span>
                </span>
              </Link>
              <Link href="#Project">
                <span
                  className={`relative ${isActive("#Project")} group`}
                  onClick={() => setCurrentPath("#Project")}
                >
                  <span className="flex items-center space-x-2 text-lg transition-colors duration-300">
                    ⚒️ <span>Project</span>
                    <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${currentPath === "#Project" ? "scale-x-100" : ""}`}></span>
                  </span>
                </span>
              </Link>
              <Link href="#Resume">
                <span
                  className={`relative ${isActive("#Resume")} group`}
                  onClick={() => setCurrentPath("#Resume")}
                >
                  <span className="flex items-center space-x-2 text-lg transition-colors duration-300">
                    📑 <span>Resume</span>
                    <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${currentPath === "#Resume" ? "scale-x-100" : ""}`}></span>
                  </span>
                </span>
              </Link>
              <Link href="#Contact">
                <span
                  className={`relative ${isActive("#Contact")} group`}
                  onClick={() => setCurrentPath("#Contact")}
                >
                  <span className="flex items-center space-x-2 text-lg transition-colors duration-300">
                    📲 <span>Contact</span>
                    <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${currentPath === "#Contact" ? "scale-x-100" : ""}`}></span>
                  </span>
                </span>
              </Link>
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
          <Link href="#Home" scroll={false} className={`block px-3 py-2 rounded-md text-lg font-medium ${isActive("#Home")}`} onClick={() => setCurrentPath("#Home")}>
            🚀 Home
          </Link>
          <Link href="#About" scroll={false} className={`block px-3 py-2 rounded-md text-lg font-medium ${isActive("#About")}`} onClick={() => setCurrentPath("#About")}>
            😎 About
          </Link>
          <Link href="#Education" scroll={false} className={`block px-3 py-2 rounded-md text-lg font-medium ${isActive("#Education")}`} onClick={() => setCurrentPath("#Education")}>
            🎓 Education
          </Link>
          <Link href="#Project" scroll={false} className={`block px-3 py-2 rounded-md text-lg font-medium ${isActive("#Project")}`} onClick={() => setCurrentPath("#Project")}>
            ⚒️ Project
          </Link>
          <Link href="#Resume" scroll={false} className={`block px-3 py-2 rounded-md text-lg font-medium ${isActive("#Resume")}`} onClick={() => setCurrentPath("#Resume")}>
            📑 Resume
          </Link>
          <Link href="#Contact" scroll={false} className={`block px-3 py-2 rounded-md text-lg font-medium ${isActive("#Contact")}`} onClick={() => setCurrentPath("#Contact")}>
            📲 Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
