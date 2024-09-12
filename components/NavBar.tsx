import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from 'next/link';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>(""); // Menyimpan ID section yang aktif
  const [hasShadow, setHasShadow] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
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
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    // Memantau section yang terlihat di viewport
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // Update section yang aktif
          }
        });
      },
      { threshold: 0.5 } // Set threshold agar hanya ter-trigger jika 50% elemen terlihat
    );

    sections.forEach((section) => observer.observe(section));

    // Membersihkan event listener dan observer saat komponen di-unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const isActive = (id: string) => 
    activeSection === id ? "text-blue-900 dark:text-white" : "text-gray-700 dark:text-gray-200";

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
            <span className="ml-2 font-semibold text-2xl dark:text-white">
              BAYU REZ
            </span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex space-x-9">
              <Link href="#Home" className={`relative ${isActive("Home")} group`}>
                <span className="flex items-center space-x-2 text-lg transition-colors duration-300  ">
                  🚀 <span>Home</span>
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${activeSection === "Home" ? "scale-x-100" : ""}`}></span>
                </span>
              </Link>
              <Link href="#About" className={`relative ${isActive("About")} group`}>
                <span className="flex items-center space-x-2 text-lg transition-colors duration-300  ">
                  😎 <span>About</span>
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${activeSection === "About" ? "scale-x-100" : ""}`}></span>
                </span>
              </Link>
              <Link href="#Education" className={`relative ${isActive("Education")} group`}>
                <span className="flex items-center space-x-2 text-lg transition-colors duration-300  ">
                  🎓 <span>Education</span>
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${activeSection === "Education" ? "scale-x-100" : ""}`}></span>
                </span>
              </Link>
              <Link href="#Project" className={`relative ${isActive("Project")} group`}>
                <span className="flex items-center space-x-2 text-lg transition-colors duration-300  ">
                  ⚒️ <span>Project</span>
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${activeSection === "Project" ? "scale-x-100" : ""}`}></span>
                </span>
              </Link>
              <Link href="#Resume" className={`relative ${isActive("Resume")} group`}>
                <span className="flex items-center space-x-2 text-lg transition-colors duration-300  ">
                  📑 <span>Resume</span>
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${activeSection === "Resume" ? "scale-x-100" : ""}`}></span>
                </span>
              </Link>
              <Link href="#Contact" className={`relative ${isActive("Contact")} group`}>
                <span className="flex items-center space-x-2 text-lg transition-colors duration-300  ">
                  📲 <span>Contact</span>
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-900 dark:bg-white transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 ${activeSection === "Contact" ? "scale-x-100" : ""}`}></span>
                </span>
              </Link>
            </div>
          </div>

          {/* Icon GitHub, Toggle Dark Mode, LinkedIn */}
          <div className="hidden md:flex items-center space-x-4 ">
            <a href="https://id.linkedin.com/in/nur-azani-bayu-rezki-08369a219" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-600 hover:scale-105">
              <FaLinkedin size={24} />
            </a>

            <a href="https://github.com/bayurz11" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:scale-105">
              <FaGithub size={24} />
            </a>

            <button onClick={toggleDarkMode} className="focus:outline-none">
              {darkMode ? <BsFillSunFill size={24} className="text-yellow-500" /> : <BsMoonStarsFill size={20} className="text-gray-700 dark:text-gray-200" />}
            </button>
          </div>

          {/* Tombol Menu Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={`${isOpen ? "hidden" : "inline-flex"}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={`${isOpen ? "inline-flex" : "hidden"}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
